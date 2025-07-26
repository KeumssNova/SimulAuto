export default function Mentions() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mentions légales</h1>
      <p className="mb-4">
        Conformément aux dispositions des articles 6-III et 19 de la Loi pour la
        Confiance dans l’Économie Numérique (LCEN), nous informons les
        utilisateurs du site <strong>SimulAuto</strong> des mentions légales
        suivantes :
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Éditeur du site</h2>
      <p>
        Nom : SimulAuto <br />
        Statut : Auto-entrepreneur <br />
        Email : contact@simulauto.fr <br />
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Hébergement</h2>
      <p>
        Hébergeur : Hostinger International Ltd <br />
        Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre <br />
        Site web :{" "}
        <a href="https://www.hostinger.fr" className="text-blue-600">
          hostinger.fr
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Nom de domaine</h2>
      <p>
        Fournisseur : OVH <br />
        Site web :{" "}
        <a href="https://www.ovh.com" className="text-blue-600">
          ovh.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Propriété intellectuelle
      </h2>
      <p>
        L’ensemble des contenus du site (textes, images, code) est protégé par
        les lois en vigueur sur la propriété intellectuelle. Toute reproduction
        est interdite sans autorisation préalable.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Responsabilité</h2>
      <p>
        SimulAuto met tout en œuvre pour fournir des informations fiables, mais
        ne saurait être tenu responsable des erreurs, omissions ou résultats
        obtenus par un usage de ces informations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        Pour toute question, vous pouvez nous contacter via le{" "}
        <a href="/contact" className="text-blue-600">
          formulaire de contact
        </a>
        .
      </p>
    </div>
  );
}
