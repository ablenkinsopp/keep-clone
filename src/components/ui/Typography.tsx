import type { ReactNode } from "react";
import type { Colour } from "../../types";

type TypographyProps = {
    children: ReactNode;
    className?: string; // Optional Tailwind classes to override defaults
    color?: Colour;
};

const colourClasses = {
    neutral: "text-slate-950 dark:text-slate-50",
    primary: "text-blue-600 dark:text-blue-400",
    secondary: "text-gray-600 dark:text-gray-400",
    error: "text-red-600 dark:text-red-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-amber-600 dark:text-amber-400",
    info: "text-sky-600 dark:text-sky-400",
    muted: "text-slate-500",
};

// H1 Component with Color Variants
export const H1 = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <h1
            className={`text-4xl md:text-5xl font-bold leading-tight ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </h1>
    );
};

// H2 Component with Color Variants
export const H2 = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <h2
            className={`text-3xl md:text-4xl font-bold leading-tight ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </h2>
    );
};

// H3 Component with Color Variants
export const H3 = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <h3
            className={`text-2xl font-bold leading-normal ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </h3>
    );
};

// H4 Component with Color Variants
export const H4 = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <h4
            className={`text-xl font-semibold leading-normal ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </h4>
    );
};

// Body Text Component with Color Variants
export const Body = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <p
            className={`text-base font-normal leading-relaxed ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </p>
    );
};

// Small Text Component with Color Variants
export const Small = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <small
            className={`text-sm font-normal ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </small>
    );
};

// Small Text Component with Color Variants
export const Tiny = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <small
            className={`text-xs font-normal leading-none ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </small>
    );
};

// Lead Text Component with Color Variants
export const Lead = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <p
            className={`text-lg font-normal leading-relaxed ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </p>
    );
};

// Muted Text Component with Color Variants
export const Muted = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <p
            className={`text-base font-normal leading-relaxed ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </p>
    );
};

// Code Text Component with Color Variants
export const Code = ({
    children,
    className,
    color = "neutral",
}: TypographyProps) => {
    return (
        <code
            className={`text-base font-mono px-1 rounded ${colourClasses[color]} ${className || ""}`}
        >
            {children}
        </code>
    );
};
