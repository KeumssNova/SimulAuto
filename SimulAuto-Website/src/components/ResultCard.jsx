const labelsActivite = {
  service: "Prestation de service",
  commerce: "Vente de marchandises",
};

export default function ResultCard({
  ca,
  activite,
  charges,
  impot,
  cotisationCMA,
  formationPro,
  cfe,
  revenuNet,
}) {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded shadow space-y-2">
      <p><strong>Chiffre d’affaires :</strong> {ca.toFixed(2)} €</p>
      <p><strong>Type d’activité :</strong> {labelsActivite[activite] || activite}</p>
      <p><strong>Charges sociales :</strong> {charges.toFixed(2)} €</p>
      <p><strong>Impôts (versement libératoire) :</strong> {impot.toFixed(2)} €</p>
      <p><strong>Cotisation CMA :</strong> {cotisationCMA.toFixed(2)} €</p>
      <p><strong>Formation professionnelle :</strong> {formationPro.toFixed(2)} €</p>
      <p><strong>CFE :</strong> {(cfe ?? 0).toFixed(2)} €</p>
      <p className="font-semibold text-lg mt-2">Revenu net : {revenuNet.toFixed(2)} €</p>
    </div>
  );
}