import { useState } from "react";

const faqData = [
  {
    question: "Comment est calculé le revenu net ?",
    answer:
      "Le revenu net est calculé en déduisant les charges sociales, les impôts (si inclus), la cotisation CMA, la formation professionnelle et la CFE de votre chiffre d’affaires.",
  },
  {
    question: "Qu’est-ce que le versement libératoire ?",
    answer:
      "C’est une option qui permet de payer votre impôt sur le revenu en même temps que vos cotisations sociales, sous forme d’un pourcentage fixe de votre chiffre d’affaires.",
  },
  {
    question: "Dois-je payer la CFE ?",
    answer:
      "Oui, la Cotisation Foncière des Entreprises est obligatoire à partir de la 2ème année d’activité, sauf exonérations.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="Faq" className="bg-gray-50 shadow rounded-xl p-6 max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">FAQ (Foire aux Questions)</h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-3">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left font-medium p-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            {item.question}
          </button>
          {activeIndex === index && (
            <p className="p-2 text-gray-700">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
