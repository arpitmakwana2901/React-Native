// Attachment types - NEW
export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'camera' | 'link';
  name: string;
  url?: string;
  thumbnail?: string;
  file?: any; // For local files
}

// Note interface - Updated
export interface Note {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  attachments?: Attachment[]; // ✅ NEW - Optional attachments
  updatedAt?: string; // ✅ NEW - Last updated timestamp
  createdAt?: string; // ✅ NEW - Creation timestamp
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

// Navigation parameter types - ADD EditNote
export type RootStackParamList = {
  MainTabs: undefined;
  AddNote: undefined;
  EditNote: {
    noteId: string;
  };
  Settings: undefined;
  DescriptionEditor: {
    description: string;
    onSave: (description: string) => void;
  };
  NoteDetail: {
    note: Note;
  };
  UserDetails: undefined;
};

// Bottom Tab Param List
export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

// Redux State
export interface NotesState {
  notes: Note[];
}