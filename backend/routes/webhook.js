import express from 'express';
import Stripe from 'stripe';
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
router.post('/',async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const { data: sub } = await supabase
      .from("subscriptions")
      .update({ status: "active" })
      .eq("stripe_id", session.subscription)
      .select()
      .single();

    await supabase.from("payments").insert([{
      user_id: sub.user_id,
      stripe_payment_id: session.payment_intent,
      amount: session.amount_total,
      currency: session.currency,
      status: "succeeded"
    }]);
  }
  res.json({ received: true });
});

export default router;
