import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/auth/login";
import Register from "./components/auth/Register";
import Dashboard from "./components/DashBoard";
import Pricing from "./components/pricing";

import Home from "./pages/Home";
import MentionsLegales from "./pages/Mentions";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/Confidentialite";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

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
            <Route
              path="/confidentialite"
              element={<PolitiqueConfidentialite />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
