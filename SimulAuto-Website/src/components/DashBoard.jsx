import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (data) {
          setSubscription(data);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) return <p className="text-center mt-10">Chargement...</p>;

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl mb-4">Bienvenue {user.email}</h2>

      {subscription ? (
        <p className="mb-4">Abonnement actif : <strong>{subscription.plan}</strong></p>
      ) : (
        <p className="mb-4 text-red-600">Aucun abonnement actif</p>
      )}

      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">
        Déconnexion
      </button>
    </div>
  );
}
