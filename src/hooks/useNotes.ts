import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthProvider";
import {
    createNote,
    deleteNote,
    fetchNotes,
    updateNote,
} from "../services/notes";
import type { ListItem, Note } from "../types";

export const useNotes = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const queryKey = ["notes", user?.id];

    const {
        data: notes = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey,
        queryFn: fetchNotes,
        enabled: !!user,
    });

    const createMutation = useMutation({
        mutationFn: ({ title, body, list }: { title: string; body: string, list: ListItem[] }) =>
            createNote(title, body, list, user!.id),
        onSuccess: (newNote) => {
            queryClient.setQueryData(queryKey, (old: Note[] = []) => [
                newNote,
                ...old,
            ]);
        },
    });

    const updateMutation = useMutation({
        mutationFn: (note: Note) => updateNote(note),
        onSuccess: (updatedNote) => {
            queryClient.setQueryData(queryKey, (old: Note[] = []) =>
                old.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
            );
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(queryKey, (old: Note[] = []) =>
                old.filter((n) => n.id !== deletedId),
            );
        },
    });

    return {
        notes,
        loading: isLoading,
        // Using mutateAsync allows your UI components to still await these if needed
        handleCreateNote: async (title: string, body: string, list: ListItem[]) =>
            createMutation.mutateAsync({ title, body, list }),
        handleUpdateNote: async (note: Note) =>
            updateMutation.mutateAsync(note),
        handleDeleteNote: async (id: string) => deleteMutation.mutateAsync(id),
        refresh: async () => {
            await refetch();
        },
    };
};
