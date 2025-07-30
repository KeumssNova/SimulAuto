// routes/simulate.js
const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

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

module.exports = router;
