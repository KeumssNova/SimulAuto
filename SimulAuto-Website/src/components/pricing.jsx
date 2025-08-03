import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function PricingSection() {
  const [user, setUser] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    
    checkUser();
  }, []);
  
  console.log(user)


  const handleCheckout = async (plan) => {
    const res = await fetch(`${BASE_URL}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, email: user?.email || "" }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <section className="mt-16 max-w-4xl flex flex-wrap sm:flex-nowrap gap-6 justify-center">
      {/* Freemium */}
      <div className="bg-white shadow rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-1">Freemium</h3>
        <p className="text-gray-600 mb-4">
          Gratuit – simulation illimitées, sans options
        </p>
      </div>

      {/* Pro */}
      <div className="bg-white shadow rounded-xl p-6 max-w-sm w-full flex flex-col justify-center items-center"> {/* remettre le justify between */}
        <p>Bientot disponibles..</p>
        {/* <div> */}
          {/* <h3 className="text-lg font-semibold mb-1">Pro – 14,99€/mois</h3>
          <p className="text-gray-600 mb-4">
            Simulations illimitées, options fiscales, PDF et historique
          </p>
        </div>
        <button
          onClick={() => {
            if (!user) {
              window.location.href = "/login";
            } else {
              handleCheckout("pro");
            }
          }}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-70 transition cursor-pointer"
        >
          {user ? "S’abonner" : "Se connecter pour s’abonner"}
        </button> */}
      </div>

      {/* Business */}
      <div className="bg-white shadow rounded-xl p-6 max-w-sm w-full flex flex-col justify-center items-center"> {/* remettre le justify between */}
        <p>Bientot disponibles..</p>
        {/* <div>
          <h3 className="text-lg font-semibold mb-1">Business – 49,99€/mois</h3>
          <p className="text-gray-600 mb-4">
            Gestion multi-profils, marque blanche, support prioritaire
          </p>
        </div>
        <button
          onClick={() => {
            if (!user) {
              window.location.href = "/login";
            } else {
              handleCheckout("business");
            }
          }}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-70 transition cursor-pointer"
        >
          {user ? "S’abonner" : "Se connecter pour s’abonner"}
        </button> */}
      </div>
    </section>
  );
}
