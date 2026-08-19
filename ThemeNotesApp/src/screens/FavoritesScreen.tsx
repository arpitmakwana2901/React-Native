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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootState } from '../store/store';
import { deleteNote, setNotes, toggleFavorite } from '../store/notesSlice';
import { useTheme } from '../context/ThemeContext';
import { Note } from '../types';
import NoteItem from '../components/NoteItem';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { colors, isLoading: themeLoading } = useTheme();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [isLoading, setIsLoading] = useState(false);

  // Filter only favorite notes
  const favoriteNotes = notes.filter((note: Note) => note.isFavorite === true);

  useFocusEffect(
    useCallback(() => {
      console.log('❤️ Favorites Screen Focused');
      loadNotes();
      return () => {
        console.log('❤️ Favorites Screen unfocused');
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this favorite note?',
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

  if (isLoading || themeLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) + 8 }]}>
        <Text style={[styles.title, { color: colors.text }]}>❤️ Favorites</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          {favoriteNotes.length} {favoriteNotes.length === 1 ? 'note' : 'notes'} in favorites
        </Text>
      </View>

      {favoriteNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { borderColor: colors.border }]}>
            <Text style={styles.emptyIconEmoji}>💔</Text>
          </View>
          <Text style={[styles.emptyText, { color: colors.text }]}>No favorites yet</Text>
          <Text style={[styles.emptySubText, { color: colors.text }]}>
            Tap the heart icon on any note to add it to your favorites
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteNotes}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
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
  listContainer: {
    paddingBottom: 24,
    paddingTop: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: -40,
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

export default FavoritesScreen;