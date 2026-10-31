import { useEffect, useRef } from "react";

type ContentEditableProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

const linkify = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
        const displayUrl = url.length > 35 ? `${url.slice(0, 32)}...` : url;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" title="${url}" class="text-blue-600 dark:text-blue-400 underline hover:opacity-80">${displayUrl}</a>`;
    });
};

const ContentEditable = ({
    value,
    onChange,
    placeholder = "Note",
    className = "",
}: ContentEditableProps) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && document.activeElement !== editorRef.current) {
            editorRef.current.innerHTML = linkify(value);
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerText);
        }
    };

    const handleBlur = () => {
        if (editorRef.current) {
            editorRef.current.innerHTML = linkify(editorRef.current.innerText);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "A" && target instanceof HTMLAnchorElement) {
            window.open(target.href, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleBlur}
            onClick={handleClick}
            data-placeholder={placeholder}
            className={`w-full px-4 py-2 text-sm text-slate-900 dark:text-slate-100 bg-transparent border-b border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-black/10 dark:focus:bg-white/10 focus:border-b-sky-500 whitespace-pre-wrap transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-slate-500 empty:before:pointer-events-none ${className}`}
        />
    );
};

export default ContentEditable;
