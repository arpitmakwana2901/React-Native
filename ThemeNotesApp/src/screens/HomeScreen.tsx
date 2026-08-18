import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store/store';
import { deleteNote, clearAllNotes, setNotes, toggleFavorite } from '../store/notesSlice';
import { useTheme } from '../context/ThemeContext';
import { Note } from '../types';
import NoteItem from '../components/NoteItem';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors, isLoading: themeLoading } = useTheme();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ NEW - Filter state
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  useFocusEffect(
    useCallback(() => {
      console.log('🏠 Home Screen Focused');
      loadNotes();

      return () => {
        console.log('🏠 Home Screen unfocused');
      };
    }, [])
  );

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes) {
        const parsedNotes: Note[] = JSON.parse(savedNotes);
        dispatch(setNotes(parsedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      Alert.alert('Error', 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ NEW - Handle favorite toggle
  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteNote(id)),
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (notes.length === 0) return;

    Alert.alert(
      'Clear All Notes',
      'This will delete all notes. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => dispatch(clearAllNotes()),
        },
      ]
    );
  };

  // ✅ NEW - Filter notes
  const filteredNotes = filter === 'all' 
    ? notes 
    : notes.filter((note: Note) => note.isFavorite === true);

  // ✅ NEW - Count favorites
  const favoriteCount = notes.filter((note: Note) => note.isFavorite).length;

  if (isLoading || themeLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading notes...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>My Notes</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
          </Text>
        </View>
        <View style={styles.headerActions}>
          {notes.length > 0 && (
            <TouchableOpacity 
              onPress={handleClearAll}
              style={[styles.clearButton, { backgroundColor: 'rgba(255, 68, 68, 0.08)' }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.clearText, { color: colors.primary }]}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ✅ NEW - Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all'
              ? { backgroundColor: colors.primary, borderColor: colors.primary }
              : { backgroundColor: 'white', borderColor: 'rgba(0,0,0,0.1)' },
          ]}
          onPress={() => setFilter('all')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.filterText,
              { color: filter === 'all' ? colors.buttonText : colors.text },
            ]}
          >
            All ({notes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'favorites'
              ? { backgroundColor: colors.primary, borderColor: colors.primary }
              : { backgroundColor: 'white', borderColor: 'rgba(0,0,0,0.1)' },
          ]}
          onPress={() => setFilter('favorites')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.filterText,
              { color: filter === 'favorites' ? colors.buttonText : colors.text },
            ]}
          >
            ❤️ Favorites ({favoriteCount})
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('AddNote')}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>+ Add Note</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: 'white', borderColor: colors.border }]}>
            <Text style={styles.emptyIconEmoji}>
              {filter === 'favorites' ? '💖' : '📝'}
            </Text>
          </View>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            {filter === 'favorites' ? 'No favorite notes yet' : 'No notes yet'}
          </Text>
          <Text style={[styles.emptySubText, { color: colors.text }]}>
            {filter === 'favorites'
              ? 'Mark a note as favorite to see it here'
              : 'Tap "+ Add Note" to create your first note'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={({ item }) => (
            <NoteItem
              note={item}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
    fontWeight: '500',
  },
  clearButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  listContainer: {
    paddingBottom: 24,
    paddingTop: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: -30,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  emptyIconEmoji: {
    fontSize: 36,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.65,
    lineHeight: 20,
  },
});

export default HomeScreen;