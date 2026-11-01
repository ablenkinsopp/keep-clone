import type { Note } from "../../types";
import { NoteCard } from "./NoteCard";

type NoteListProps = {
    notes: Note[];
    onSelect: (note: Note) => void;
};

const NoteList = ({ notes, onSelect }: NoteListProps) => (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {notes
            .sort(
                (a, b) =>
                    Date.parse(b.updated_at?.toLocaleString() ?? "") -
                    Date.parse(a.updated_at?.toLocaleString() ?? ""),
            )
            .map((note) => (
                <NoteCard key={note.id} note={note} onSelectNote={() => onSelect(note)} />
            ))}
    </div>
);

export default NoteList;
