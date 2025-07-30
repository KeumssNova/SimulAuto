import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const priceIds = {
  pro: "price_1Rpa6xD6J96wmmnQOEZUXZel",
  business: "price_1RpaBsD6J96wmmnQ7hLjnccI",
};

export default function Pricing() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getUserEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    getUserEmail();
  }, []);

  const handleCheckout = async (plan) => {
    if (!userEmail) {
      alert("Veuillez vous connecter d'abord.");
      return;
    }

    const priceId = priceIds[plan];
    const res = await fetch("${import.meta.env.VITE_API_URL}/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, priceId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erreur lors du paiement");
    }
  };

  return (
    <section className="mt-16 max-w-4xl flex flex-wrap sm:flex-nowrap gap-6 justify-center">
      <div className="bg-white shadow rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-1">Freemium</h3>
        <p className="text-gray-600 mb-4">Gratuit – accès limité</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6 max-w-sm w-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Pro – 19,99€/mois</h3>
          <p className="text-gray-600 mb-4">Accès aux fonctions avancées</p>
        </div>
        <button
          onClick={() => handleCheckout("pro")}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-70  transition cursor-pointer"
        >
          S’abonner
        </button>
      </div>

      <div className="bg-white shadow rounded-xl p-6 max-w-sm w-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Business – 59,99€/mois</h3>
          <p className="text-gray-600 mb-4">Pensé pour un usage intensif</p>
        </div>
        <button
          onClick={() => handleCheckout("business")}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-70   transition-all cursor-pointer"
        >
          S’abonner
        </button>
      </div>
    </section>
  );
}
