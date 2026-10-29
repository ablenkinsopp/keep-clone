import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import { Small } from "../components/ui/Typography";
import NoteList from "../components/notes/NoteList";
import OpenNote from "../components/notes/OpenNote";
import type { Note } from "../types";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { useNotes } from "../contexts/NotesProvider";

const NotesDashboard = () => {
    const { signOut } = useAuth();
    const { notes, loading } = useNotes();
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    useLockBodyScroll(selectedNote !== null);

    return (
        <>
            <div className="flex flex-col min-h-svh">
                <Header />
                <div className="flex-1 flex flex-col px-2 lg:px-8 w-full max-w-240 mx-auto">
                    <div className="flex flex-col items-start gap-4 py-4">
                        <Button
                            onClick={() => setSelectedNote({ title: "", body: "" })}
                            iconRight={<PlusCircleIcon weight="bold" />}
                        >
                            Create Note
                        </Button>
                        {loading ? (
                            <Small>Loading...</Small>
                        ) : (
                            <NoteList notes={notes} onSelect={setSelectedNote} />
                        )}
                    </div>
                </div>
                <Button onClick={signOut}>Sign out</Button>
            </div>
            <OpenNote
                note={selectedNote}
                onClose={() => setSelectedNote(null)}
            />
        </>
    );
};

export default NotesDashboard;
