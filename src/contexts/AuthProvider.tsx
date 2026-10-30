import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentSession, onAuthStateChange } from "../services/auth";
import { getUserProfile } from "../services/users";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Helper to handle both pieces of data before turning off the loading screen
        const syncSessionAndProfile = async (currentSession: any) => {
            setSession(currentSession);

            if (currentSession?.user) {
                const { data, error } = await getUserProfile(
                    currentSession.user.id,
                );
                if (!error && data) {
                    const userWithAvatar = {
                        ...currentSession.user,
                        avatar_url: data.avatar_url,
                        username: data.username,
                    };
                    setUser(userWithAvatar);
                }
            } else {
                // Wipe the profile if the user just logged out
                setUser(null);
            }

            setLoading(false);
        };

        // 1. Initial mount check
        getCurrentSession().then(({ data: { session: initialSession } }) => {
            syncSessionAndProfile(initialSession);
        });

        // 2. Ongoing listener for login/logout
        const {
            data: { subscription },
        } = onAuthStateChange((_event, newSession) => {
            syncSessionAndProfile(newSession);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session, user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
