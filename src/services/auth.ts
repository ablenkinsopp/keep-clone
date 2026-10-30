import { supabase } from "../supabase";

export const signUpUser = async (
    email: string,
    password: string,
    username: string,
) => {
    return await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    });
};

export const signInUser = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
};

export const signOutUser = async () => {
    return await supabase.auth.signOut();
};

export const getCurrentSession = async () => {
    return await supabase.auth.getSession();
};

// We also export the listener so the provider can watch for login/logout events
export const onAuthStateChange = (
    callback: (event: string, session: any) => void,
) => {
    return supabase.auth.onAuthStateChange(callback);
};
