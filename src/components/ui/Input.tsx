import { Input as HeadlessInput, Field, Label } from "@headlessui/react";
import type { InputProps } from "../../types";

const Input = ({
    label,
    error,
    className = "",
    disabled,
    ...props
}: InputProps) => {
    const baseClasses =
        "w-full px-4 py-2 placeholder:text-slate-500 transition-colors";

    const stateClasses = error
        ? "border-b border-b-red-600 dark:border-b-red-400"
        : disabled
          ? "pointer-none bg-slate-300 border-b-slate-500 dark:bg-slate-600 dark:text-slate-400 dark:border-b-slate-400 cursor-not-allowed"
          : "bg-slate-100 text-slate-900 border-b border-b-slate-300 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700 focus:outline-none focus:bg-black/10 dark:focus:bg-white/10 focus:border-b-sky-500";

    return (
        <Field className="flex flex-col gap-1">
            {label && <Label className="text-sm font-medium">{label}</Label>}
            <HeadlessInput
                className={`${baseClasses} ${stateClasses} ${className}`}
                invalid={!!error}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </Field>
    );
};

export default Input;
