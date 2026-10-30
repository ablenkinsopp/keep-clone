import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import type { Note } from "../types";
import { useAuth } from "./AuthProvider";
import {
    createNote,
    deleteNote,
    fetchNotes,
    updateNote,
} from "../services/notes";

type NotesContextType = {
    notes: Note[];
    loading: boolean;
    handleCreateNote: (
        title: string,
        body: string,
    ) => Promise<null | undefined>;
    handleUpdateNote: (note: Note) => Promise<null | undefined>;
    handleDeleteNote: (id: string) => Promise<null | undefined>;
    refresh: () => Promise<void>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    const handleFetchNotes = useCallback(async () => {
        if (!user) {
            setNotes([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const fetchedNotes = await fetchNotes();
            setNotes(fetchedNotes);
        } catch (error) {
            console.log(`handleFetchNotes Error:, ${error}`);
        }

        setLoading(false);
    }, [user]);

    useEffect(() => {
        handleFetchNotes();
    }, [handleFetchNotes]);

    const handleCreateNote = async (title: string, body: string) => {
        if (!user) return null;

        try {
            const newNote = await createNote(title, body, user.id);
            setNotes((prev) => [newNote, ...prev]);
        } catch (error) {
            console.log(`handleCreateNote Error:, ${error}`);
        }
    };

    const handleUpdateNote = async (note: Note) => {
        if (!user) return null;

        try {
            const updatedNote = await updateNote(note);
            setNotes((prev) =>
                prev.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
            );
        } catch (error) {
            console.log(`handleUpdateNote Error:, ${error}`);
        }
    };

    const handleDeleteNote = async (id: string) => {
        if (!user) return null;

        try {
            await deleteNote(id);
            setNotes((prev) => prev.filter((n) => n.id !== id));
        } catch (error) {
            console.log(`handleUpdateNote Error:, ${error}`);
        }
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                loading,
                handleCreateNote,
                handleUpdateNote,
                handleDeleteNote,
                refresh: handleFetchNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes must be used within NotesProvider");
    return context;
};
