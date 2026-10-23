import { useAuth } from "../contexts/AuthProvider";
import Gateway from "./auth/Gateway";
import AwsmNts from "./AwsmNts";

function App() {
    const { user } = useAuth();

    if (!user) {
        return (
            <Gateway />
        )
    }

    return (
        <AwsmNts />
    );
}

export default App;