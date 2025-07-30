import express from "express";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.post("/", async (req, res) => {
  const { email, plan } = req.body;
  console.log("Requête checkout reçue :", { email, plan });

  if (!email || !plan) return res.status(400).json({ error: "Email et plan requis" });

  try {
    let { data: user, error: userError } = await supabase.from("profiles").select("*").eq("email", email).single();
    if (userError && userError.code !== "PGRST116") throw userError;

    if (!user) {
      const { data: newUser, error: insertError } = await supabase.from("profiles").insert([{ email }]).select().single();
      if (insertError) throw insertError;
      user = newUser;
    }

    const prices = {
      basic: process.env.STRIPE_BASIC_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID,
    };

    const DOMAIN = process.env.DOMAIN || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: prices[plan], quantity: 1 }],
      mode: "subscription",
      customer_email: email,
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/cancel`,
      // Pas d'expansion "subscription" ici, ça ne sert à rien
    });

    // Insérer une subscription "pending" pour cet utilisateur avec session.id pour relier (optionnel)
    await supabase.from("subscriptions").insert([
      {
        user_id: user.id,
        stripe_checkout_session_id: session.id, // lien avec la session Stripe
        plan,
        status: "pending",
      },
    ]);

    res.json({ url: session.url });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


export default router;
