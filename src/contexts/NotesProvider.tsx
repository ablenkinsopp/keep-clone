import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import type { Note } from "../types";
import { useAuth } from "./AuthProvider";

type NotesContextType = {
    notes: Note[];
    loading: boolean;
    createNote: (title: string, body: string) => Promise<Note | null>;
    updateNote: (note: Note) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    refresh: () => Promise<void>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = useCallback(async () => {
        if (!user) {
            setNotes([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .order("updated_at", { ascending: false });

        if (!error && data) setNotes(data);
        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const createNote = async (title: string, body: string) => {
        if (!user) return null;
        
        const { data, error } = await supabase
            .from("notes")
            .insert([{ title, body, user_id: user.id }])
            .select()
            .single();

        if (!error && data) {
            setNotes((prev) => [data, ...prev]);
        }
        return data;
    };

    const updateNote = async (note: Note) => {
        const { data: updatedNote, error } = await supabase
            .from("notes")
            .update({ title: note.title, body: note.body })
            .eq("id", note.id)
            .select()
            .single()


        if (!error) {
            setNotes((prev) => prev.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
        }
    };

    const deleteNote = async (id: string) => {
        const { error } = await supabase.from("notes").delete().eq("id", id);
        if (!error) {
            setNotes((prev) => prev.filter((n) => n.id !== id));
        }
    };

    return (
        <NotesContext.Provider value={{ notes, loading, createNote, updateNote, deleteNote, refresh: fetchNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes must be used within NotesProvider");
    return context;
};