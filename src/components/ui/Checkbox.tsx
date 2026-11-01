import { Checkbox as HUICheckbox, Field, Label } from "@headlessui/react";
import { CheckIcon } from "@phosphor-icons/react";
import type { ComponentPropsWithoutRef } from "react";

type CheckboxProps = {
    label?: string;
    className?: string;
} & ComponentPropsWithoutRef<typeof HUICheckbox>;

const Checkbox = ({
    label,
    className = "",
    ...props
}: CheckboxProps) => {
    return (
        <Field className="flex items-center gap-2">
            <HUICheckbox
                {...props}
                className={`group flex size-4 items-center justify-center rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 data-[checked]:bg-slate-900 dark:data-[checked]:bg-slate-100 data-[checked]:border-slate-900 dark:data-[checked]:border-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 transition-colors cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 ${className}`}
            >
                <CheckIcon 
                    weight="bold" 
                    className="hidden size-3 text-white dark:text-slate-900 group-data-checked:block" 
                />
            </HUICheckbox>
            {label && (
                <Label className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                    {label}
                </Label>
            )}
        </Field>
    );
};

export default Checkbox;