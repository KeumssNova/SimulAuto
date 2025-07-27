import express from 'express';
const router = express.Router();
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

// Price IDs Stripe à récupérer dans ton dashboard Stripe après création des plans
const PRICE_IDS = {
  pro: process.env.STRIPE_BASIC_PRICE_ID,       // Remplace par ton ID Pro 20€/mois
  business: process.env.STRIPE_PRO_PRICE_ID,  // Remplace par ton ID Business 59€/mois
};

// Endpoint pour créer une session checkout Stripe
router.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  if (!priceId || !Object.values(PRICE_IDS).includes(priceId)) {
    return res.status(400).json({ error: 'Price ID invalide' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/pricing`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la session' });
  }
});

export default router;
