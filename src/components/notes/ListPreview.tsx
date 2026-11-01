import { CheckIcon } from "@phosphor-icons/react";
import type { ListItem } from "../../types";

const ListPreview = ({ items = [] }: { items?: ListItem[] }) => {
    const previewItems = items.slice(0, 5);
    const remainingCount = items.length - previewItems.length;

    if (items.length === 0) {
        return <p className="text-sm text-slate-400 italic">Empty list</p>;
    }

    return (
        <div className="flex flex-col gap-1.5 text-sm text-slate-700 dark:text-slate-300">
            {previewItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                    <div
                        className={`size-3.5 rounded border flex items-center justify-center ${
                            item.completed
                                ? "bg-slate-400 border-slate-400 dark:bg-slate-600 dark:border-slate-600"
                                : "border-slate-300 dark:border-slate-700 bg-transparent"
                        }`}
                    >
                        {item.completed && (
                            <CheckIcon
                                weight="bold"
                                className="size-2.5 text-white"
                            />
                        )}
                    </div>
                    <span
                        className={`truncate ${
                            item.completed
                                ? "line-through opacity-50"
                                : "opacity-90"
                        }`}
                    >
                        {item.text || "Blank item"}
                    </span>
                </div>
            ))}
            {remainingCount > 0 && (
                <span className="text-xs text-slate-400 mt-1 font-medium">
                    +{remainingCount} more item{remainingCount > 1 ? "s" : ""}
                </span>
            )}
        </div>
    );
};

export default ListPreview;
