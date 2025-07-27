import React from 'react';

const priceIds = {
  pro: 'price_1Rpa6xD6J96wmmnQOEZUXZel',   
  business: 'price_1RpaBsD6J96wmmnQ7hLjnccI', 
};



export default function Pricing() {
  const handleSubscribe = async (priceId) => {
    const res = await fetch('/api/pricing/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Erreur lors du paiement');
    }
  };

  const handleCheckout = async (priceId) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, priceId })
    });
    const data = await res.json();
    window.location.href = data.url;
  };
  

  return (
    <div className="pricing">
      <h1>Nos offres</h1>

      <div className="plan">
        <h2>Freemium</h2>
        <p>Gratuit, limité</p>
      </div>

      <div className="plan">
        <h2>Pro</h2>
        <p>20€/mois - Fonctions avancées</p>
        <button onClick={() => handleSubscribe(priceIds.pro)}>S’abonner</button>
      </div>

      <div className="plan">
        <h2>Business</h2>
        <p>59€/mois - Usage pro intensif</p>
        <button onClick={() => handleSubscribe(priceIds.business)}>S’abonner</button>
      </div>
    </div>
  );
}