import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className=" max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Contactez-nous</h1>
      <p className="text-gray-600 mb-6">
        Une question, une suggestion ou un bug à signaler ? Remplissez le formulaire ci-dessous
        et nous vous répondrons dans les plus brefs délais.
      </p>
      <ContactForm />
    </div>
  );
}