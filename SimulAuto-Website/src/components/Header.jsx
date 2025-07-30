import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const MenuLinks = () => (
    <>
      <a href="/" className="hover:text-blue-600">Accueil</a>
      <a href="#Faq" className="hover:text-blue-600">FAQ</a>
      <a href="/contact" className="hover:text-blue-600">Contact</a>

      {!session ? (
        <>
          <a href="/login" className="hover:text-blue-600">Connexion</a>
          <a href="/register" className="hover:text-blue-600">Inscription</a>
        </>
      ) : (
        <>
          <a href="/dashboard" className="hover:text-blue-600">Mon Compte</a>
          <button onClick={handleLogout} className="hover:text-red-600">Déconnexion</button>
        </>
      )}
    </>
  );

  return (
    <header className="relative bg-white shadow p-4 flex justify-between items-center">
      <a href="/" className="text-xl font-bold text-blue-600">
        SimulAuto
      </a>

      {/* Desktop */}
      <nav className="hidden md:flex space-x-4 items-center">
        <MenuLinks />
      </nav>

      {/* Burger */}
      <button
        className="md:hidden flex items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col space-y-2 p-4 md:hidden z-50">
          <MenuLinks />
        </nav>
      )}
    </header>
  );
}
