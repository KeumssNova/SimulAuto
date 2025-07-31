// routes/simulate.js
import express from 'express';
const router = express.Router();
import supabase from '../utils/supabaseClient.js';

router.post("/save", async (req, res) => {
  const { userId, simulation } = req.body;

  if (!userId || !simulation) {
    return res.status(400).json({ error: "Champs manquants." });
  }

  const { error } = await supabase
    .from("simulations")
    .insert([{ user_id: userId, ...simulation }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true });
});

export default router;
