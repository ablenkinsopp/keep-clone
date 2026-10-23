import { useState } from 'react'
import { supabase } from '../../supabase'
import Input from '../ui/Input'
import Button from '../ui/Button'
import type { AuthFormProps } from '../../types'
import TextLink from '../ui/TextLink'
import { Tiny } from '../ui/Typography'

const SignUpForm = ({ onToggle} : AuthFormProps) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [busy, setBusy] = useState(false)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setBusy(true)
        setMessage('')

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        })

        if (error) {
            setMessage(`Error: ${error.message}`)
        } else {
            setMessage(`Signed up as ${data.user?.email}. Check the dashboard.`)
            setEmail('')
            setUsername('')
            setPassword('')
        }

        setBusy(false)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <Input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />

            <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />

            <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Password"
            />

            {message && <p className="text-sm">{message}</p>}

            <div className='w-full flex justify-between'>
                <div className="flex flex-col gap-1 items-start">
                    <Tiny color="muted">Have an account?</Tiny>
                    <TextLink onClick={onToggle} type="button">
                        Login
                    </TextLink>
                </div>
                <Button
                    type="submit"
                    disabled={busy}
                >
                    {busy ? 'Signing up...' : 'Sign up'}
                </Button>
            </div>

            
        </form>
    )
}

export default SignUpForm;