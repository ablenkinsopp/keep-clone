import { useAuth } from "./contexts/AuthProvider";
import GatewayPage from "./pages/GatewayPage";
import NotesDashboard from "./pages/NotesDashboard";

function App() {
    const { user } = useAuth();

    if (!user) {
        return <GatewayPage />;
    }

    return <NotesDashboard />;
}

export default App;
