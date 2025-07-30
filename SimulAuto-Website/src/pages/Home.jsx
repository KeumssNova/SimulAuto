import Pricing from "../components/pricing";
import SEO from "../components/Seo";
import SimulationForm from "../components/SimulationForm";
import FAQ from "../pages/FAQ";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <SEO
        title="Simulateur Auto-Entrepreneur 2025 - Calculez vos impôts"
        description="Calculez facilement vos cotisations et impôts en tant qu'auto-entrepreneur. Gratuit, rapide et fiable."
      />
      <h1 className="text-3xl font-bold text-center mb-6">Simulateur Auto-Entrepreneur 2025</h1>
      <p className="text-center mb-8 text-gray-700">
        Estimez vos cotisations sociales et votre revenu net en quelques secondes.
      </p>
      <SimulationForm />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Pourquoi utiliser ce simulateur ?</h2>
        <p className="text-gray-600">
          Notre simulateur vous permet d'estimer vos charges sociales et impôts selon votre chiffre d’affaires.
          Basé sur les taux officiels 2025, il est simple, rapide et gratuit.
        </p>
      </section>
      <Pricing />
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Des questions ?</h2>
        <FAQ/>
      </section>
    </div>
  );
}
