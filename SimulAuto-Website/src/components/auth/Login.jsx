// src/components/auth/Login.jsx
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!isValidEmail(email)) {
      setMessage("Veuillez entrer une adresse email valide.");
      setLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("invalid login credentials")) {
        setMessage("Email ou mot de passe incorrect.");
      } else if (msg.includes("email not confirmed")) {
        setMessage(
          "Veuillez confirmer votre adresse email avant de vous connecter."
        );
      } else {
        setMessage("Une erreur est survenue : " + error.message);
      }
    } else {
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 mb-24">
        <h2 className="text-2xl mb-4 text-center">Connexion</h2>

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
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
        <p className="text-sm text-center mt-2">
          <Link to="/reset-password" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </p>

        {message && (
          <p className="mt-4 text-sm text-center text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
}
