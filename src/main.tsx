import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/sora";
import "./index.css";
import App from "./components/App.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>,
);
