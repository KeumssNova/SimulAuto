import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Stripe from "stripe";
import checkoutRoutes from './routes/checkout.js'
import pricingRoutes from './routes/pricing.js';
import webhookRoutes from './routes/webhook.js';
import { createClient } from '@supabase/supabase-js';
import bodyParser from "body-parser";


dotenv.config({path: "/etc/secrets/.env"});

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());


console.log("SMTP config:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  passLength: process.env.SMTP_PASS?.length,
});

// Config nodemailer avec Brevo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,  // smtp.gmail.com
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // false car port 587 utilise STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  const mailOptions = {
    from: `"SimulAuto" <contact@simulauto.fr>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Message via SimulAuto - ${nom}`,
    text: message,
    html: `<h3>Nouveau message :</h3><p>${message}</p><p><strong>De :</strong> ${nom} - ${email}</p>`,
    replyTo: email 
  };

  transporter.verify((error, success) => {
    if (error) {
      console.error('Erreur de connexion SMTP :', error);
    } else {
      console.log('Connexion SMTP réussie, prêt à envoyer des emails.');
    }
  });

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur d'envoi :", error);
    res.status(500).json({ error: "Erreur serveur, message non envoyé" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

// STRIPE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
  '/api/webhook',
  bodyParser.raw({ type: 'application/json' })
);

// Routes à ajouter plus bas
app.use("/api/checkout", checkoutRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/webhook', webhookRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log('Serveur démarré');
});

// BDD 


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);