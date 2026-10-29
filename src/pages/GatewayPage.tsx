import { useState } from "react";
import { Logo } from "../components/ui/Brand";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import { Tiny } from "../components/ui/Typography";

const GatewayPage = () => {
    const [login, setLogin] = useState(true);

    const toggleLogin = () => {
        setLogin(!login);
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex flex-col items-center justify-center px-2 lg:px-4">
            <div className="flex flex-col gap-8 transition-all w-full px-8 items-center max-w-96 md:max-w-110">
                <div className="flex flex-col gap-2 self-start">
                    <Logo className="h-6 md:h-8 text-slate-950 dark:text-slate-50 self-start" />
                    <Tiny color="muted">{ login ? "Welcome back!" : "Nice to meet you!" }</Tiny>
                </div>

                <div className="relative w-full">
                    <div
                        key={login ? "login" : "signup"}
                        className="animate-[fadeIn_300ms_ease-out]"
                    >
                        {login ? <LoginForm onToggle={toggleLogin} /> : <SignUpForm onToggle={toggleLogin} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GatewayPage;
