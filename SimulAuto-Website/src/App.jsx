import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import MentionsLegales from "./pages/Mentions";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/Confidentialite";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentions" element={<MentionsLegales />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
