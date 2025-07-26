import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("http://ton-backend.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: data.message });
        setFormData({ nom: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Erreur inconnue" });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Erreur réseau ou serveur" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow">
      <div>
        <label htmlFor="nom" className="block font-medium mb-1">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-medium mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Envoyer
      </button>

      {status && (
        <p className={`mt-4 font-semibold ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
