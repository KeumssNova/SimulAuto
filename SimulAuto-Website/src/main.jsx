import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { supabase } from "./utils/supabaseClient";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <SessionContextProvider supabaseClient={supabase}>
        <App />
      </SessionContextProvider>
    </HelmetProvider>
  </StrictMode>
);
