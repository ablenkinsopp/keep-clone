import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type Colour =
    | "neutral"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "info"
    | "muted";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type AuthFormProps = {
    onToggle: () => void;
};

export type ListItem = {
    id: string;
    text: string;
    completed: boolean;
};

export type Note = {
    id?: string;
    title: string;
    body?: string;
    list?: ListItem[];
    created_at?: Date | string;
    updated_at?: Date | string;
};

export type InputProps = {
    label?: string;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type TextareaProps = {
    label?: string;
    error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;
