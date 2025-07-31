// routes/simulate.js
import express from 'express';
const router = express.Router();
import supabase from "../supabaseAdmin.js";

// Fonction utilitaire : récupère le nombre de simulations aujourd'hui pour un utilisateur
async function getTodaySimulationsCount(userId) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from("simulations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", startOfDay.toISOString());

  if (error) throw error;
  return count;
}

router.post("/save", async (req, res) => {
  const { userId, simulation } = req.body;

  if (!userId || !simulation) {
    return res.status(400).json({ error: "Champs manquants." });
  }

  // 🟡 Récupère le plan de l’utilisateur
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    return res.status(400).json({ error: "Profil utilisateur introuvable." });
  }

  const userPlan = profile.plan || 'free';

  if (userPlan === "free") {
    try {
      const todayCount = await getTodaySimulationsCount(userId);
      if (todayCount >= 2) {
        return res.status(403).json({ error: "Limite quotidienne atteinte pour le plan Free." });
      }
    } catch (err) {
      return res.status(500).json({ error: "Erreur lors de la vérification des limites." });
    }
  }

  // ✅ Enregistre la simulation
  const { error } = await supabase
    .from("simulations")
    .insert([{ user_id: userId, ...simulation }]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true });
});

export default router;  
