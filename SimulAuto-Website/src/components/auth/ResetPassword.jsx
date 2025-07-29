import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!isValidEmail(email)) {
      setMessage("Veuillez entrer une adresse email valide.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setMessage("Une erreur est survenue : " + error.message);
    } else {
      setMessage("Un lien de réinitialisation a été envoyé à votre adresse email.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleReset} className="max-w-md mx-auto p-4 mb-24">
        <h2 className="text-2xl mb-4 text-center">Mot de passe oublié</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
}
