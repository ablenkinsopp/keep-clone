import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import SignUpForm from "./auth/SignUpForm";
import LoginForm from "./auth/LoginForm";
import { Body, H1 } from "./ui/Typography";
import { ProfileSettings } from "./profile/ProfileSettings";
import { Logo } from "./ui/Brand";
import Button from "./ui/Button";
import Gateway from "./auth/Gateway";

function App() {
    const [login, setLogin] = useState(true);
    const { user, loading, signOut } = useAuth();

    if (!user) {
        return (
            <Gateway />
        )
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col items-center justify-center">
            
            <>
                {loading ? <div className="p-8">Loading...</div> : 
                (
                    user ? (
                        <div className="flex flex-col items-center space-y-4">
                            <Body>Signed in as {user.email}</Body>
                            <ProfileSettings />
                            <button
                                onClick={signOut}
                                className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <>
                            {login ? <LoginForm /> : <SignUpForm />}
                            <p onClick={() => setLogin(!login)}>{login ? "Sign Up" : "Login"}</p>
                        </>
                    )
                )}
            </>
        </div>
    );
}

export default App;