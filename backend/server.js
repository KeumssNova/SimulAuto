import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Brevo utilise TLS (false pour 587) jsp pk 
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
    from: `"SimulAuto Contact" <contact@simulauto.fr>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Message via SimulAuto - ${nom}`,
    text: message,
    html: `<h3>Nouveau message :</h3><p>${message}</p><p><strong>De :</strong> ${nom} - ${email}</p>`,
    replyTo: email 
  };

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
