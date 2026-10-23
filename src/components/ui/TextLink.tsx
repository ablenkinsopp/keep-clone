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

const TextLink = ({ size = "sm", ...props}: ButtonProps) => {
    const { children, className, href, onClick, ...rest } = props;

    // Now TypeScript knows this is the Button variant, so 'disabled' exists
    const { disabled } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

    const sharedClasses =
        "flex items-center justify-center";

    const sizeClasses: Record<Size, string> = {
        xs: "",
        sm: "text-sm",
        md: "text-md",
        lg: "",
        xl: "",
    };

    const colourClasses = disabled
        ? "pointer-none text-slate-300 dark:text-slate-700"
        : "cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:underline transition-all duration-300";

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

export default TextLink;
