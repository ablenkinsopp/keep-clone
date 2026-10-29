import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/sora";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { NotesProvider } from "./contexts/NotesProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <NotesProvider>
                <App />
            </NotesProvider>
        </AuthProvider>
    </StrictMode>,
);
