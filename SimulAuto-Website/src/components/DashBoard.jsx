import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl mb-4">Bienvenue {user.email}</h2>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">
        Déconnexion
      </button>
    </div>
  );
}
