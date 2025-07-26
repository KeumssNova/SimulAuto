import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Config nodemailer (à personnaliser)
const transporter = nodemailer.createTransport({
  host: "smtp.example.com", // ex: smtp.gmail.com ou smtp.hostinger.com
  port: 465, // ou 587 (TLS)
  secure: true, // true pour 465, false pour 587
  auth: {
    user: process.env.SMTP_USER, // ton email SMTP
    pass: process.env.SMTP_PASS, // mot de passe SMTP
  },
});

app.post("/api/contact", async (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  const mailOptions = {
    from: `"${nom}" <${email}>`,
    to: process.env.CONTACT_EMAIL, // ton email où tu reçois les messages
    subject: `Nouveau message de ${nom} via SimulAuto`,
    text: message,
    html: `<p>${message}</p><p>De : ${nom} - ${email}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message envoyé !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur, message non envoyé" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur contact lancé sur le port ${PORT}`);
});
