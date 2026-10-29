import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from "react";
import type { Size } from "../../types";

type ButtonVariant = "filled" | "ghost";

type BaseProps = {
    children: ReactNode;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: Size;
    className?: string;
    square?: boolean;
    variant?: ButtonVariant;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => void;
};

type ButtonProps =
    | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const Button = ({
    size = "sm",
    square = false,
    variant = "filled",
    ...props
}: ButtonProps) => {
    const { children, iconLeft, iconRight, className, href, onClick, ...rest } =
        props;

    // Now TypeScript knows this is the Button variant, so 'disabled' exists
    const { disabled } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

    const sharedClasses = `${!children && ((!iconLeft && iconRight) || (iconLeft && !iconRight)) ? "w-9" : "px-4"} flex gap-1 py-2 rounded flex items-center justify-center font-semibold`;
    
    const variantClasses: Record<ButtonVariant, string> = {
        filled: `text-slate-50 dark:text-slate-950 ${disabled ? "bg-slate-400 dark:bg-slate-600" : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 hover:dark:bg-slate-300"}`,
        ghost: "text-slate-900 hover:text-slate-800 hover:bg-black/10 dark:text-slate-50 dark:hover:text-slate-200 dark:hover:bg-white/10"
    }
    const sizeClasses: Record<Size, string> = {
        xs: "",
        sm: "text-sm",
        md: "text-base",
        lg: "",
        xl: "",
    };

    const disabledClasses = disabled
        ? "pointer-none"
        : "cursor-pointer transition-all duration-300";

    const combinedClasses = `${sharedClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                className={combinedClasses}
                onClick={onClick}
                {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {iconLeft}
                {children}
                {iconRight}
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
            {iconLeft}
            {children}
            {iconRight}
        </button>
    );
};

export default Button;
