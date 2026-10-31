import { Field, Textarea as HUITextarea, Label } from "@headlessui/react";
import type { TextareaProps } from "../../types";
import { useEffect, useRef } from "react";

const Textarea = ({
    label,
    error,
    className = "",
    disabled,
    value,
    ...props
}: TextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fieldRef = useRef<HTMLElement>(null);

    const adjustHeight = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
        adjustHeight(); // Initial adjust

        // Observe container width changes
        const observer = new ResizeObserver(() => {
            adjustHeight();
        });

        if (fieldRef.current) {
            observer.observe(fieldRef.current);
        }

        return () => {
            if (fieldRef.current) {
                observer.unobserve(fieldRef.current);
            }
        };
    }, []);

    // Also adjust when value changes (typing)
    useEffect(() => {
        adjustHeight();
    }, [value]);

    const baseClasses =
        "w-full px-4 py-2 placeholder:text-slate-500 transition-colors text-sm resize-none";

    const stateClasses = error
        ? "border-b border-b-red-600 dark:border-b-red-400"
        : disabled
          ? "pointer-none bg-slate-300 border-b-slate-500 dark:bg-slate-600 dark:text-slate-400 dark:border-b-slate-400 cursor-not-allowed"
          : "bg-slate-100 text-slate-900 border-b border-b-slate-300 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700 focus:outline-none focus:bg-black/10 dark:focus:bg-white/10 focus:border-b-sky-500";

    return (
        <Field ref={fieldRef} className="flex flex-col gap-1">
            {label && <Label className="text-sm font-medium">{label}</Label>}
            <HUITextarea
                className={`${baseClasses} ${stateClasses} ${className}`}
                invalid={!!error}
                value={value}
                ref={textareaRef}
                rows={1}
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

export default Textarea;
