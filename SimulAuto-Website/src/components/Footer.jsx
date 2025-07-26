export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
      <div className="flex flex-wrap gap-1 justify-center">
      © 2025 SimulAuto -{" "}
      <a href="/mentions" className="hover:text-blue-600">
        Mentions légales
      </a> /
      <a href="/contact" className="hover:text-blue-600">
        Contact
      </a>
      </div>
    </footer>
  );
}
