import { supabase } from '../supabase';
import type { Note } from '../types';

export const fetchNotes = async (): Promise<Note[]> => {
    const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });

    if (error) {
        console.error('Error fetching notes:', error);
        throw new Error(error.message);
    }
    return data || [];
};

export const createNote = async (title: string, body: string, userId: string): Promise<Note> => {
    const { data, error } = await supabase
        .from('notes')
        .insert([{ title, body, user_id: userId }])
        .select()
        .single();

    if (error) {
        console.error('Error creating note:', error);
        throw new Error(error.message);
    }
    return data;
};

export const updateNote = async (note: Note): Promise<Note> => {
    const { data, error } = await supabase
        .from('notes')
        .update({ title: note.title, body: note.body })
        .eq('id', note.id)
        .select()
        .single();

    if (error) {
        console.error('Error updating note:', error);
        throw new Error(error.message);
    }
    return data;
};

export const deleteNote = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting note:', error);
        throw new Error(error.message);
    }
};