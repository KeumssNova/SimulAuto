import express from "express";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.post("/", async (req, res) => {
  const { email, plan } = req.body;

  if (!email || !plan) return res.status(400).json({ error: "Email et plan requis" });

  try {
    // Vérifier si user existe
    let { data: user } = await supabase.from("profiles").select("*").eq("email", email).single();
    if (!user) {
      const { data: newUser } = await supabase.from("profiles").insert([{ email }]).select().single();
      user = newUser;
    }

    const prices = {
      basic: process.env.STRIPE_BASIC_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: prices[plan], quantity: 1 }],
      mode: "subscription",
      customer_email: email,
      success_url: `${process.env.DOMAIN}/success`,
      cancel_url: `${process.env.DOMAIN}/cancel`,
      expand: ['subscription'] 
    });

    const subscriptionId = session.subscription.id;

    await supabase.from("subscriptions").insert([{
      user_id: user.id,
      stripe_subscription_id: subscriptionId,
      plan,
      status: "pending"
    }]);

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
