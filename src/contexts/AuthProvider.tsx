import { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../supabase';

type AuthContextType = {
    session: Session | null;
    user: (User & { avatar_url: string | null, username: string }) | null;
    loading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [userWithProfile, setUserWithProfile] = useState<(User & { avatar_url: string | null, username: string }) | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session) {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('avatar_url, username')
                        .eq('id', session.user.id)
                        .single();

                    if (!error && data) {
                        const userWithAvatar = {
                            ...session.user,
                            avatar_url: data.avatar_url,
                            username: data.username,
                        };
                        setUserWithProfile(userWithAvatar);
                    }
                } else {
                    setUserWithProfile(null);
                }
                setSession(session);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                user: userWithProfile,
                loading,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
};
