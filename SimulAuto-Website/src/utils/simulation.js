const tauxParActivite = {
  service: {
    charges: 0.22,
    impot: 0.017,
    cma: 0.0048,
    formation: 0.003,
    seuilTVA: 36800,
    plafondCA: 77700,
  },
  commerce: {
    charges: 0.12,
    impot: 0.01,
    cma: 0,
    formation: 0.001,
    seuilTVA: 91900,
    plafondCA: 188700,
  },
};

export function calculAutoEntrepreneur(ca, activite = "service", options = {}) {
  if (typeof ca !== "number" || ca < 0) {
    throw new Error("Chiffre d'affaires invalide");
  }
  if (!tauxParActivite[activite]) {
    throw new Error("Activité inconnue");
  }

  const {
    charges: tauxCharges,
    impot: tauxImpots,
    cma,
    formation,
    seuilTVA,
    plafondCA,
  } = tauxParActivite[activite];

  const {
    versementLiberatoire = true,
    inclureCFE = false,
    montantCFE = 300, // estimation annuelle forfaitaire
  } = options;

  const charges = ca * tauxCharges;
  const impot = versementLiberatoire ? ca * tauxImpots : 0;
  const cotisationCMA = ca * cma;
  const formationPro = ca * formation;
  const cfe = inclureCFE ? montantCFE : 0;
  const revenuNet = ca - charges - impot - cotisationCMA - formationPro - cfe;

  const depasseTVA = ca > seuilTVA;
  const depassePlafond = ca > plafondCA;

  return {
    ca,
    activite,
    charges,
    impot,
    cotisationCMA,
    formationPro,
    cfe,
    revenuNet,
    depasseTVA,
    depassePlafond,
    seuilTVA,
    plafondCA,
  };
}