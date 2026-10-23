import { Input as HeadlessInput, Field, Label } from "@headlessui/react";
import type { InputHTMLAttributes } from "react";

type InputProps = {
    label?: string;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, error, className = "", disabled, ...props }: InputProps) => {
    const baseClasses =
        "w-full px-4 py-2 placeholder:text-slate-500 transition-colors";

    const stateClasses = error
    ? "border-b border-b-red-600 dark:border-b-red-400"
    : disabled ?
        "pointer-none bg-slate-300 border-b-slate-500 dark:bg-slate-600 dark:text-slate-400 dark:border-b-slate-400 cursor-not-allowed" : 
        "bg-slate-100 text-slate-900 border-b border-b-slate-300 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700 focus:outline-none focus:ring-2 focus:rounded focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-sky-500";

    return (
        <Field className="flex flex-col gap-1">
            {label && <Label className="text-sm font-medium">{label}</Label>}
            <HeadlessInput
                className={`${baseClasses} ${stateClasses} ${className}`}
                invalid={!!error}
                {...props}
            />
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        </Field>
    );
};

export default Input;