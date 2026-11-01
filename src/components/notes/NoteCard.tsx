import moment from "moment";
import type { Note } from "../../types";
import { Lead, Tiny } from "../ui/Typography";
import ListPreview from "./ListPreview";
import TextPreview from "./TextPreview";

type NoteCardProps = {
    note: Note;
    onSelectNote: (note: Note) => void;
};

export const NoteCard = ({ note, onSelectNote }: NoteCardProps) => {
    return (
        <div
            onClick={() => onSelectNote(note)}
            className="break-inside-avoid mb-4 w-full cursor-pointer flex flex-col gap-2 p-4 rounded shadow-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 hover:dark:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all ease-in"
        >
            <div className="flex flex-col gap-0 sm:flex-row-reverse sm:gap-4 sm:justify-between sm:items-center">
                <Tiny color="muted">
                    {moment(note.updated_at).fromNow()}
                </Tiny>
                {note.title && <Lead>{note.title}</Lead>}
            </div>

            {note.list && note.list.length > 0 ? (
                <ListPreview items={note.list} />
            ) : (
                <TextPreview text={note.body ?? ""} />
            )}
        </div>
    );
};