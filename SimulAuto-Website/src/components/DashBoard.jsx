import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .single();

        if (data) setSubscription(data);
      }
    };

    fetchUser();
  }, []);

  const handleManageSubscription = async () => {
    const res = await fetch("/api/stripe-portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: subscription.stripe_customer_id, // ou customer_id selon ton champ
      }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Bienvenue {user.email}
        </h2>

        {subscription ? (
          <ul className="text-left text-gray-700 space-y-2 mb-6">
            <li>
              <span className="font-medium">Abonnement :</span>{" "}
              {subscription.plan}
            </li>
            <li>
              <span className="font-medium">Statut :</span>{" "}
              {subscription.status}
            </li>
            <li>
              <span className="font-medium">Début :</span>{" "}
              {new Date(subscription.created_at).toLocaleDateString()}
            </li>
          </ul>
        ) : (
          <p className="text-red-600 mb-6 text-center">
            Aucun abonnement actif
          </p>
        )}

        <div className="flex flex-col gap-3">
          {subscription && (
            <button
              onClick={handleManageSubscription}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Gérer mon abonnement
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
