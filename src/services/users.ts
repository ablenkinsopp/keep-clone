import { supabase } from '../supabase';

export const getUserProfile = async (userId: string) => {
    return await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
};