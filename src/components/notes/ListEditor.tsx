import { useEffect, useRef } from "react";
import { PlusIcon, XIcon } from "@phosphor-icons/react";
import type { ListItem } from "../../types";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";

type ListProps = {
    items: ListItem[];
    onChange: (items: ListItem[]) => void;
    editMode?: Boolean;
};

const ListEditor = ({ items, onChange, editMode = true }: ListProps) => {
    // Map to hold HTML input nodes keyed by unique item ID
    const inputRefs = useRef(new Map<string, HTMLInputElement>());

    const focusInput = (id: string) => {
        requestAnimationFrame(() => {
            inputRefs.current.get(id)?.focus();
        });
    };

    useEffect(() => {
        if (items.length === 0) {
            const initialItem: ListItem = {
                id: crypto.randomUUID(),
                text: "",
                completed: false,
            };
            onChange([initialItem]);
            focusInput(initialItem.id);
        }
    }, [items, onChange]);

    const handleToggle = (id: string) => {
        onChange(
            items.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item,
            ),
        );
    };

    const handleTextChange = (id: string, text: string) => {
        onChange(
            items.map((item) => (item.id === id ? { ...item, text } : item)),
        );
    };

    const handleRemove = (id: string) => {
        onChange(items.filter((item) => item.id !== id));
    };

    const handleAddItemAfter = (index: number) => {
        const newItem: ListItem = {
            id: crypto.randomUUID(),
            text: "",
            completed: false,
        };
        const updatedItems = [...items];
        // Insert directly below the active item rather than appending to the end
        updatedItems.splice(index + 1, 0, newItem);
        onChange(updatedItems);
        focusInput(newItem.id);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        item: ListItem,
        index: number,
        activeSectionList: ListItem[],
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const globalIndex = items.findIndex((i) => i.id === item.id);
            handleAddItemAfter(globalIndex);
        } else if (e.key === "Backspace" && item.text === "") {
            e.preventDefault();
            if (activeSectionList.length > 1) {
                // Shift focus to preceding line before deleting
                const prevItem =
                    activeSectionList[index - 1] ||
                    activeSectionList[index + 1];
                if (prevItem) {
                    focusInput(prevItem.id);
                }
                handleRemove(item.id);
            }
        }
    };

    const activeItems = items.filter((item) => !item.completed);
    const completedItems = items.filter((item) => item.completed);

    return (
        <div className="flex flex-col gap-2 w-full text-sm">
            {/* Active Checklist Items */}
            <div className="flex flex-col gap-1">
                {activeItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-2 group ${editMode ? 'p-2' : 'py-2'} bg-slate-50 text-slate-900 border-b border-b-slate-300 dark:bg-slate-950 dark:text-slate-50 dark:border-slate-700 focus-within:outline-none hover:bg-black/10 focus-within:bg-black/5 dark:hover:bg-white/15 dark:focus-within:bg-white/10 focus-within:border-b-sky-500`}
                    >
                        <Checkbox
                            checked={item.completed}
                            onChange={() => handleToggle(item.id)}
                        />
                        <input
                            ref={(el) => {
                                if (el) inputRefs.current.set(item.id, el);
                                else inputRefs.current.delete(item.id);
                            }}
                            name={`li-${index}`}
                            type="text"
                            value={item.text}
                            onChange={(e) =>
                                handleTextChange(item.id, e.target.value)
                            }
                            onKeyDown={(e) =>
                                handleKeyDown(e, item, index, activeItems)
                            }
                            placeholder="List item"
                            className="w-full bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                        />
                        {editMode && (
                            <Button
                                type="button"
                                onClick={() => handleRemove(item.id)}
                                tabIndex={-1}
                                size="xs"
                                variant="ghost"
                                iconLeft={<XIcon weight="bold" />}
                                className="opacity-0 group-hover:opacity-100"
                            ></Button>
                        )}
                    </div>
                ))}
            </div>

            {editMode && (
                <Button
                    type="button"
                    onClick={() => handleAddItemAfter(items.length - 1)}
                    iconLeft={<PlusIcon weight="bold" />}
                    variant="ghost"
                    size="xs"
                    className="self-start"
                >
                    New item
                </Button>
            )}

            {/* Completed Items Section */}
            {completedItems.length > 0 && (
                <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-2 flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-400 mb-1 select-none">
                        {completedItems.length} completed item
                        {completedItems.length > 1 ? "s" : ""}
                    </span>
                    {completedItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 opacity-60 group"
                        >
                            <Checkbox
                                checked={item.completed}
                                onChange={() => handleToggle(item.id)}
                            />
                            <input
                                ref={(el) => {
                                    if (el) inputRefs.current.set(item.id, el);
                                    else inputRefs.current.delete(item.id);
                                }}
                                type="text"
                                value={item.text}
                                onChange={(e) =>
                                    handleTextChange(item.id, e.target.value)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(
                                        e,
                                        item,
                                        index,
                                        completedItems,
                                    )
                                }
                                className="w-full bg-transparent outline-none line-through text-slate-900 dark:text-slate-100"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(item.id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-opacity p-1"
                                tabIndex={-1}
                            >
                                <XIcon size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListEditor;
