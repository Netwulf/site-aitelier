import { createRoot } from "react-dom/client";
// Initialize i18n before App
import "./i18n";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
