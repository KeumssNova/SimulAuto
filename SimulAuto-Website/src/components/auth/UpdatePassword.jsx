import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Mot de passe mis à jour avec succès !");
      setTimeout(() => navigate("/login"), 1500);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleUpdate} className="max-w-md mx-auto p-4 mb-24">
        <h2 className="text-2xl mb-4 text-center">Nouveau mot de passe</h2>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          className="w-full p-2 border mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
}
