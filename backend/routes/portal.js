import express from "express";
import Stripe from "stripe";
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { customerId } = req.body;

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: "https://www.simulauto.fr/dashboard",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
