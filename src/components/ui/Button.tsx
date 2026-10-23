import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from "react";
import type { Size } from "../../types";

type BaseProps = {
    children: ReactNode;
    size?: Size;
    className?: string;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => void;
};

type ButtonProps =
    | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const Button = ({ size = "sm", ...props}: ButtonProps) => {
    const { children, className, href, onClick, ...rest } = props;

    // Now TypeScript knows this is the Button variant, so 'disabled' exists
    const { disabled } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

    const sharedClasses =
        "px-4 py-2 rounded flex items-center justify-center font-semibold text-slate-50 dark:text-slate-950";

    const sizeClasses: Record<Size, string> = {
        xs: "",
        sm: "text-sm",
        md: "text-base",
        lg: "",
        xl: "",
    };

    const colourClasses = disabled
        ? "pointer-none bg-slate-400 dark:bg-slate-600"
        : "cursor-pointer bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 hover:dark:bg-slate-300 transition-all duration-300";

    const combinedClasses = `${sharedClasses} ${sizeClasses[size]} ${colourClasses}`;

    if (href) {
        return (
            <a
                href={href}
                className={combinedClasses}
                onClick={onClick}
                {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </a>
        );
    }

    

    return (
        <button
            className={combinedClasses}
            disabled={disabled}
            onClick={onClick}
            {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {children}
        </button>
    );
};

export default Button;
