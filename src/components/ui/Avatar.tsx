import { useAuth } from "../../contexts/AuthProvider";
import type { Size } from "../../types";

type AvatarProps = {
    size?: Size;
    inHeader?: boolean;
};

const Avatar = ({ size = "sm", inHeader = false }: AvatarProps) => {
    const { user } = useAuth();

    // Base classes for the avatar container
    const baseClasses = "rounded-full overflow-hidden flex items-center justify-center";

    // Size classes (matches your existing logic)
    const sizeClasses: Record<Size, string> = {
        xs: "w-6 h-6",
        sm: "w-8 h-6",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16", // Added a default for xl
    };

    // Header-specific size classes
    const headerClasses = "w-8 h-8";

    // Generate a consistent background colour based on the username
    const getUsernameBgColour = (username?: string) => {
        if (!username) return "bg-gray-500"; // Fallback colour

        // Hash the username to get a deterministic number
        const hash = username.split("").reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);

        // Map the hash to a specific colour from a predefined list
        const colours = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-orange-500",
        ];

        // Ensure the hash is within the bounds of the colours array
        const colourIndex = Math.abs(hash) % colours.length;
        return colours[colourIndex];
    };

    // Determine the final classes for the avatar container
    const avatarClasses = `${baseClasses} ${
        inHeader ? headerClasses : sizeClasses[size]
    }`;

    return (
        <div className={avatarClasses}>
            {user?.avatar_url ? (
                // If an avatar URL is provided, render the image
                <img
                    className="w-full h-full object-cover"
                    src={user.avatar_url}
                    alt={user.username}
                />
            ) : (
                // If no avatar URL, render the first letter of the username with a consistent background
                <div
                    className={`w-full h-full flex items-center justify-center text-white font-medium ${getUsernameBgColour(user?.username)}`}
                >
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
            )}
        </div>
    );
};

export default Avatar;
