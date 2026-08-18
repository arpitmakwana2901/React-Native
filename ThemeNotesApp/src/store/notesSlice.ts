import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: NotesState = {
  notes: [],
};

// Helper to save notes
const saveNotesToStorage = async (notes: Note[]) => {
  try {
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id' | 'isFavorite'>>) => {
      const newNote: Note = {
        id: Date.now().toString(),
        ...action.payload,
        isFavorite: false, // ✅ NEW - Default to false
      };
      state.notes.push(newNote);
      saveNotesToStorage(state.notes);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveNotesToStorage(state.notes);
    },
    clearAllNotes: (state) => {
      state.notes = [];
      saveNotesToStorage(state.notes);
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    // ✅ NEW - Toggle Favorite
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const note = state.notes.find((n) => n.id === action.payload);
      if (note) {
        note.isFavorite = !note.isFavorite;
        saveNotesToStorage(state.notes);
      }
    },
  },
});

export const { 
  addNote, 
  deleteNote, 
  clearAllNotes, 
  setNotes, 
  toggleFavorite // ✅ NEW 
} = notesSlice.actions;

export default notesSlice.reducer;