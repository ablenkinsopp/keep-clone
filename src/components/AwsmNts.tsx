import { useAuth } from "../contexts/AuthProvider";
import Button from "./ui/Button";
import Header from "./ui/Header"

const AwsmNts = () => {
    const { signOut } = useAuth();
    return (
        <>
            <Header />

            <Button onClick={signOut}>
                Sign out
            </Button>
        </>
    )
}

export default AwsmNts;