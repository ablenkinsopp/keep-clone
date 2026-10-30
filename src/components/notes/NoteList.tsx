import type { Note } from "../../types";
import { Lead, Small, Tiny } from "../ui/Typography";
import { truncate } from "../../utils";
import moment from "moment";

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
                    <div className="flex gap-4 justify-between items-center">
                        <Lead>{note.title}</Lead>
                        <Tiny color="muted">{moment(note.updated_at).fromNow()}</Tiny>
                    </div>
                    <Small>{truncate(note.body, 200)}</Small>
                </div>
            ))}
        </>
    );
};

export default NoteList;
