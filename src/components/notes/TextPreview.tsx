const TextPreview = ({ text }: { text: string }) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return (
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap line-clamp-6">
            {parts.map((part, index) => {
                if (part.match(urlRegex)) {
                    const displayUrl =
                        part.length > 30 ? `${part.slice(0, 27)}...` : part;
                    return (
                        <a
                            key={index}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 dark:text-blue-400 underline hover:opacity-80 break-all"
                        >
                            {displayUrl}
                        </a>
                    );
                }
                return part;
            })}
        </p>
    );
};

export default TextPreview;
