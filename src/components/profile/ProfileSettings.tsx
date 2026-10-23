import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthProvider'
import { supabase } from '../../supabase'
import { AvatarUpload } from '../auth/AvatarUpload'

export const ProfileSettings = () => {
    const { user } = useAuth()
    const [profile, setProfile] = useState<{ username: string; avatar_url: string | null } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, avatar_url')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
            } else {
                setProfile(data)
            }
            setLoading(false)
        }

        fetchProfile()
    }, [user])

    const handleAvatarUpload = async (url: string) => {
        if (!user) return

        const { error } = await supabase
            .from('profiles')
            .update({ avatar_url: url })
            .eq('id', user.id)

        if (error) {
            alert(`Error updating avatar: ${error.message}`)
        } else {
            setProfile(prev => prev ? { ...prev, avatar_url: url } : null)
        }
    }

    if (loading || !user) return <div>Loading...</div>

    return (
        <div className="p-8 max-w-md mx-auto">
            <h2 className="text-xl mb-6">Profile Settings</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Username</label>
                    <input
                        type="text"
                        value={profile?.username || ''}
                        readOnly
                        className="w-full border rounded px-3 py-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Avatar</label>
                    <AvatarUpload
                        userId={user.id}
                        onUploadComplete={handleAvatarUpload}
                        currentUrl={profile?.avatar_url || undefined}
                    />
                </div>
            </div>
        </div>
    )
}