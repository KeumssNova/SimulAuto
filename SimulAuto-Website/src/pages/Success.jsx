import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Tu peux faire un appel backend pour récupérer les infos de la session si besoin
      console.log('Paiement réussi session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Merci pour votre abonnement !</h1>
      <p>Votre paiement a été pris en compte avec succès.</p>
    </div>
  );
}
