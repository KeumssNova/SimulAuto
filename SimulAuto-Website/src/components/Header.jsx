export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <a href="/" className="text-xl font-bold text-blue-600">SimulAuto</a>
      <nav className="space-x-4">
        <a href="/" className="hover:text-blue-600">
          Accueil
        </a>
        <a href="#Faq" className="hover:text-blue-600">
          FAQ
        </a>
        <a href="/contact" className="hover:text-blue-600">
          Contact
        </a>
      </nav>
    </header>
  );
}
