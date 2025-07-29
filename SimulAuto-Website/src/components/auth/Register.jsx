// src/components/auth/Register.jsx
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : "Vérifie tes mails pour confirmer !");
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Créer un compte</h2>
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
      <button className="bg-black text-white px-4 py-2 w-full">S’inscrire</button>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </form>
  );
}
