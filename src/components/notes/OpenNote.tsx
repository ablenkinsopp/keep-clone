import { useEffect, useRef, useState } from "react";
import { CheckCircleIcon, TrashIcon } from "@phosphor-icons/react";
import type { Note } from "../../types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { CSSTransition } from "react-transition-group";
import Textarea from "../ui/Textarea";
import { useNotes } from "../../hooks/useNotes";

type OpenNoteProps = {
    note: Note | null;
    onClose: () => void;
};

const OpenNote = ({ note = null, onClose }: OpenNoteProps) => {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const nodeRef = useRef<HTMLDivElement>(null);

    const { handleCreateNote, handleDeleteNote, handleUpdateNote } = useNotes();

    const onCreateNote = () => {
        handleCreateNote(title, body);
    };

    const onEditNote = () => {
        const updatedNote: Note = {
            ...note,
            title,
            body,
        };
        handleUpdateNote(updatedNote);
    };

    const onSaveOrCreate = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (note?.id) {
            onEditNote();
        } else {
            onCreateNote();
        }
        onClose();
    };

    const onDeleteNote = async () => {
        if (!note?.id) return;
        handleDeleteNote(note.id);
        onClose();
    }

    useEffect(() => {
        setTitle(note ? note.title : "");
        setBody(note ? note.body : "");
    }, [note]);

    return (
        <div>
            <CSSTransition
                in={note !== null}
                timeout={300}
                nodeRef={nodeRef}
                appear={true}
                classNames={{
                    appear: "opacity-0",
                    appearActive: "transition-opacity duration-250 opacity-100",
                    enter: "opacity-0",
                    enterActive: "transition-opacity duration-250 opacity-100",
                    exitActive: "transition-opacity duration-200 opacity-0",
                }}
                unmountOnExit
            >
                <div
                    ref={nodeRef}
                    className="bg-black/25 dark:bg-white/25 fixed top-0 h-dvh left-0 right-0 flex justify-center items-center md:px-4"
                    onClick={(e) => {
                        // console.log(e.target, e.currentTarget);
                        if (e.target === e.currentTarget) {
                            onClose();
                        }
                    }}
                >
                    <form
                        onSubmit={onSaveOrCreate}
                        className={`${note ? "opacity-100" : "opacity-0"} bg-slate-50 dark:bg-slate-950 p-4 w-full max-w-2xl md:min-w-xl flex flex-col gap-4`}
                    >
                        <Input
                            value={title}
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />

                        <Textarea
                            value={body}
                            name="body"
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Note"
                        />

                        <div className="flex justify-between">
                            <Button
                                onClick={onDeleteNote}
                                iconLeft={<TrashIcon weight="bold" />}
                                variant="ghost"
                                type="button"
                            >
                                Delete
                            </Button>
                            <Button
                                disabled={body === ""}
                                type="submit"
                                iconLeft={<CheckCircleIcon weight="bold" />}
                            >
                                Save & Close
                            </Button>
                        </div>
                    </form>
                </div>
            </CSSTransition>
        </div>
    );
};

export default OpenNote;
