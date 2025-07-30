import express from "express";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Important : utiliser express.raw() middleware pour cette route webhook dans ton serveur principal
// Par exemple dans server.js ou app.js :
// app.use('/api/webhook', express.raw({type: 'application/json'}), webhookRouter);

router.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log("⚠️  Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Webhook checkout.session.completed reçu :", session);
  
    // Ici on récupère l'id d'abonnement Stripe
    const subscriptionId = session.subscription;
  
    if (!subscriptionId) {
      console.error("Subscription ID manquant dans webhook !");
      return res.status(400).send("Subscription ID manquant");
    }
  
    // Récupérer l'abonnement sur Stripe (optionnel, si besoin)
    const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  
    // Mettre à jour la subscription en base avec l'id d'abonnement réel et statut "active"
    const { data: sub, error } = await supabase
      .from("subscriptions")
      .update({ 
        stripe_subscription_id: subscriptionId,
        status: "active",
      })
      .eq("stripe_checkout_session_id", session.id)  // on utilise la session.id comme lien
      .select()
      .single();
  
    if (error) {
      console.error("Erreur update subscription :", error);
      return res.status(500).send("Erreur update subscription");
    }
  
    await supabase.from("payments").insert([
      {
        user_id: sub.user_id,
        stripe_payment_id: session.payment_intent,
        amount: session.amount_total,
        currency: session.currency,
        status: "succeeded",
      },
    ]);
  
    res.status(200).send("Success");
  } else {
    res.status(200).send("Event ignored");
  }

});

export default router;
