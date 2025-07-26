import { useState } from "react";
import { calculAutoEntrepreneur } from "../utils/simulation";
import ResultCard from "./ResultCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function SimulationForm() {
  const [ca, setCa] = useState("");
  const [activity, setActivity] = useState("service");
  const [versementLiberatoire, setVersementLiberatoire] = useState(true);
  const [inclureCFE, setInclureCFE] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    setError(null);
    try {
      const caNum = parseFloat(ca);
      if (isNaN(caNum)) throw new Error("Veuillez saisir un chiffre valide");
      const res = calculAutoEntrepreneur(caNum, activity, {
        versementLiberatoire,
        inclureCFE,
      });
      setResult(res);
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  const dataPie = result
    ? [
        { name: "Charges sociales", value: result.charges },
        { name: "Impôts (versement libératoire)", value: result.impot },
        { name: "Cotisation CMA", value: result.cotisationCMA },
        { name: "Formation pro", value: result.formationPro },
        { name: "CFE", value: result.cfe },
        { name: "Revenu net", value: result.revenuNet },
      ]
    : [];

  return (
    <div className="bg-white shadow rounded-xl p-6 max-w-lg mx-auto">
      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Chiffre d’affaires (€)</label>
          <input
            type="number"
            value={ca}
            onChange={(e) => setCa(e.target.value)}
            className="w-full border rounded p-2"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Type d’activité</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="service">Prestations de service (22%)</option>
            <option value="commerce">Vente de marchandises (12%)</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="versementLiberatoire"
            checked={versementLiberatoire}
            onChange={() => setVersementLiberatoire(!versementLiberatoire)}
          />
          <label htmlFor="versementLiberatoire" className="select-none">
            Inclure versement libératoire (impôt)
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="inclureCFE"
            checked={inclureCFE}
            onChange={() => setInclureCFE(!inclureCFE)}
          />
          <label htmlFor="inclureCFE" className="select-none">
            Inclure Cotisation Foncière des Entreprises (CFE)
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculer
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

      {result && (
        <>
          {(result.depasseTVA || result.depassePlafond) && (
            <div className="mt-4 p-3 rounded bg-yellow-100 text-yellow-800 font-semibold">
              {result.depasseTVA && (
                <p>⚠️ Attention : vous dépassez le seuil de TVA à {result.seuilTVA} €.</p>
              )}
              {result.depassePlafond && (
                <p>⚠️ Attention : vous dépassez le plafond autorisé à {result.plafondCA} €.</p>
              )}
            </div>
          )}

          <ResultCard {...result} />

          <div className="mt-6" style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dataPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
