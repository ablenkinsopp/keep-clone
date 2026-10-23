import { useState } from 'react'
import { supabase } from '../../supabase'

type AvatarUploadProps = {
    userId: string
    onUploadComplete: (url: string) => void
    currentUrl?: string
}

export const AvatarUpload = ({ userId, onUploadComplete, currentUrl }: AvatarUploadProps) => {
    const [uploading, setUploading] = useState(false)
    const [message, setMessage] = useState('')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setMessage('')

        try {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Please select an image file')
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('Image must be less than 5MB')
            }

            // Create a unique file path: profiles/{userId}/avatar.{ext}
            const fileExt = file.name.split('.').pop()
            const filePath = `${userId}/avatar.${fileExt}`

            // Upload to Supabase Storage
            const { error } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (error) throw error

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            onUploadComplete(urlData.publicUrl)
            setMessage('Avatar uploaded successfully!')
        } catch (error: any) {
            setMessage(`Error: ${error.message}`)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                {currentUrl && (
                    <img
                        src={currentUrl}
                        alt="Current avatar"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                )}
                
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded file:border-0
                            file:text-sm file:font-semibold
                            file:bg-gray-100 file:text-gray-700
                            hover:file:bg-gray-200
                            disabled:opacity-50"
                    />
                    
                    {uploading && (
                        <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                    
                    {message && (
                        <p className={`text-sm mt-2 ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
