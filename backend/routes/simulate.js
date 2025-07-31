import express from 'express';
import { supabaseAdmin } from '../supabaseAdmin.js';

const router = express.Router();

router.post("/save", async (req, res) => {
  const { userId, simulation } = req.body;

  if (!userId || !simulation) {
    return res.status(400).json({ error: "Champs manquants." });
  }

  const { error } = await supabaseAdmin
    .from("simulations")
    .insert([{ user_id: userId, ...simulation }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true });
});

export default router;
