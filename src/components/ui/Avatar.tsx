import { useAuth } from "../../contexts/AuthProvider";
import type { Size } from "../../types"

type AvatarProps = {
    size?: Size;
    inHeader?: Boolean;
}

const Avatar = ({ size = "sm", inHeader = false }: AvatarProps) => {

    const { user } = useAuth();

    const baseClasses = "rounded-full overflow-hidden"

    const sizeClasses: Record<Size, string> = {
        xs: "w-6 h-6",
        sm: "w-8 h-6",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "",
    };

    const headerClasses = "w-8 h-8 lg:w-10 lg:h-10"
    
    return (
        <div className={`${baseClasses} ${inHeader ? headerClasses : sizeClasses[size]} flex items-center justify-center`}>
            { user?.avatar_url && (
                <img className="w-full" src={user.avatar_url} alt={user.username} />
            )}
        </div>
    )
}

export default Avatar;