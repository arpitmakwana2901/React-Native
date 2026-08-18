// Note interface
export interface Note {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
}

// Theme type
export type ThemeType = 'red' | 'green' | 'blue' | 'yellow';

// Theme Colors
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  buttonText: string;
}

// Navigation parameter types - ADD NoteDetail
export type RootStackParamList = {
  Home: undefined;
  AddNote: undefined;
  Settings: undefined;
  DescriptionEditor: {
    description: string;
    onSave: (description: string) => void;
  };
  NoteDetail: {  // ✅ NEW
    note: Note;
  };
};

// Redux State
export interface NotesState {
  notes: Note[];
}