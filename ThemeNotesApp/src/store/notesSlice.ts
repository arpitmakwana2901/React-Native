import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState, Attachment } from '../types';
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
        isFavorite: false,
        attachments: action.payload.attachments || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.notes.push(newNote);
      saveNotesToStorage(state.notes);
    },
    
    // ✅ NEW - Update note
    updateNote: (state, action: PayloadAction<{ id: string; updates: Partial<Note> }>) => {
      const { id, updates } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        saveNotesToStorage(state.notes);
      }
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
  updateNote,  // ✅ NEW
  deleteNote, 
  clearAllNotes, 
  setNotes, 
  toggleFavorite 
} = notesSlice.actions;

export default notesSlice.reducer;