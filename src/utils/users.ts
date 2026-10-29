import { useAuth } from '../contexts/AuthProvider'
import { supabase } from '../supabase'

export async function searchUsers(query: string) {
    const { user } = useAuth() // Or get it from your context

    if (!query || !user) return []

    // Search profiles where username OR email starts with the query
    const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .or(`username.ilike.%${query}%,email.ilike.%${query}%`)
        .neq('id', user.id) // Exclude current user
        .limit(10)

    if (error) throw error
    return data
}