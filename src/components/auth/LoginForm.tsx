import { useState } from "react";
import { supabase } from "../../supabase";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type { AuthFormProps } from "../../types";
import TextLink from "../ui/TextLink";
import { Tiny } from "../ui/Typography";

const LoginForm = ({ onToggle }: AuthFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [busy, setBusy] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setBusy(true);
        setMessage('');

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage(`Signed in with ${data.user.email}`);
            setEmail('');
            setPassword('');
        }
        
        setBusy(false);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                required
            />

            <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                name="password"
                required
                minLength={6}
            />

            {message && <p className="text-sm">{message}</p>}

            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 items-start">
                    <Tiny color="muted">No account?</Tiny>
                    <TextLink onClick={onToggle} type="button">
                        Sign Up
                    </TextLink>
                </div>
                <Button
                    type="submit"
                    disabled={busy}
                >
                    {busy ? 'Logging in' : 'Login'}
                </Button>
            </div>
            

        </form>
    )
}

export default LoginForm;
