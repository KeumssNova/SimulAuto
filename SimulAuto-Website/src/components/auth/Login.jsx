// src/components/auth/Login.jsx
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full p-2 border mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-black text-white px-4 py-2 w-full">Se connecter</button>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </form>
  );
}
