// src/components/auth/Register.jsx
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const isValidPassword = (password) => password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Validations simples
    if (!isValidEmail(email)) {
      setMessage("Veuillez entrer une adresse e-mail valide.");
      setLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      setLoading(false);
      return;
    }

    console.log("Email:", cleanEmail);
    console.log("Password length:", cleanPassword.length);

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPassword,
    });

    console.log("data", data);
    console.log("error", error);
    if (error) {
      // Supabase gère déjà si l'email est déjà pris
      setMessage("Erreur : " + error.message.replace("AuthApiError: ", ""));
    } else {
      setUser(data.user);
      setMessage(
        "Inscription réussie ! Vérifiez votre email pour confirmer votre compte."
      );
    }

    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!isValidEmail(email)) {
      setMessage(
        "Veuillez entrer une adresse e-mail valide pour réinitialiser le mot de passe."
      );
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage("Erreur lors de la réinitialisation : " + error.message);
    } else {
      setMessage("Un email de réinitialisation vous a été envoyé.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 mb-24">
        <h2 className="text-2xl mb-4 text-center">Créer un compte</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading ? "Chargement..." : "S’inscrire"}
        </button>

        <button
          type="button"
          className="mt-2 text-sm text-blue-600 underline w-full text-center"
          onClick={handleResetPassword}
        >
          Mot de passe oublié ?
        </button>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
