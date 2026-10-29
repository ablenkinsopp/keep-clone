import type { Note } from "../../types";
import { Lead, Small } from "../ui/Typography";
import { truncate } from "../../utils";

type NoteListProps = {
    notes: Note[];
    onSelect: (note: Note) => void;
};

const NoteList = ({ notes, onSelect }: NoteListProps) => {
    return (
        <>
            {notes.sort((a, b) => Date.parse(b.updated_at?.toLocaleString() ?? "") - Date.parse(a.updated_at?.toLocaleString() ?? "")).map((note) => (
                <div
                    key={note.id}
                    onClick={() => onSelect(note)}
                    className="cursor-pointer flex flex-col gap-2 p-4 rounded shadow-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 hover:dark:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all ease-in"
                >
                    <Lead>{note.title}</Lead>
                    <Small>{truncate(note.body, 200)}</Small>
                </div>
            ))}
        </>
    );
};

export default NoteList;
