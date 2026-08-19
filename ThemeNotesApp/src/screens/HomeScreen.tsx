import React, { useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
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
import {
  deleteNote,
  clearAllNotes,
  setNotes,
  toggleFavorite,
} from '../store/notesSlice';
import { useTheme } from '../context/ThemeContext';
import { Note } from '../types';
import NoteItem from '../components/NoteItem';
import FilterModal, { AttachmentFilterType } from '../components/FilterModal';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { colors, isLoading: themeLoading } = useTheme();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [isLoading, setIsLoading] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [attachmentFilter, setAttachmentFilter] = useState<AttachmentFilterType>('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('🏠 Home Screen Focused');
      loadNotes();

      return () => {
        console.log('🏠 Home Screen unfocused');
      };
    }, []),
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

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteNote(id)),
      },
    ]);
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
      ],
    );
  };

  // ✅ Combined Search & Filter Logic with useMemo
  const filteredNotes = useMemo(() => {
    return notes.filter((note: Note) => {
      // 1. Favorites tab filter
      if (filter === 'favorites' && !note.isFavorite) {
        return false;
      }

      // 2. Case-insensitive search query filter (matches title or description)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.trim().toLowerCase();
        const titleMatch = note.title.toLowerCase().includes(query);
        const descMatch = note.description.toLowerCase().includes(query);
        if (!titleMatch && !descMatch) {
          return false;
        }
      }

      // 3. Attachment type filter
      if (attachmentFilter !== 'all') {
        const atts = note.attachments || [];
        if (attachmentFilter === 'attachments') {
          if (atts.length === 0) return false;
        } else if (attachmentFilter === 'images') {
          const hasImages = atts.some(
            (a) => a.type === 'image' || a.type === 'camera'
          );
          if (!hasImages) return false;
        } else if (attachmentFilter === 'videos') {
          const hasVideos = atts.some((a) => a.type === 'video');
          if (!hasVideos) return false;
        } else if (attachmentFilter === 'links') {
          const hasLinks = atts.some((a) => a.type === 'link');
          if (!hasLinks) return false;
        }
      }

      return true;
    });
  }, [notes, filter, searchQuery, attachmentFilter]);

  // Count favorites
  const favoriteCount = notes.filter((note: Note) => note.isFavorite).length;

  const getAttachmentFilterLabel = (type: AttachmentFilterType) => {
    switch (type) {
      case 'images':
        return '🖼️ Images';
      case 'videos':
        return '▶️ Videos';
      case 'links':
        return '🔗 Links';
      case 'attachments':
        return '📎 Attachments';
      default:
        return '';
    }
  };

  const handleClearFilters = () => {
    setAttachmentFilter('all');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetAllFilters = () => {
    setSearchQuery('');
    setAttachmentFilter('all');
    setFilter('all');
  };

  if (isLoading || themeLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading notes...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Header - Safe Area Inset */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) + 8 }]}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>My Notes</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
          </Text>
        </View>
        <View style={styles.headerActions}>
          {/* Profile Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('UserDetails')}
            style={styles.profileButton}
            activeOpacity={0.7}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
          {notes.length > 0 && (
            <TouchableOpacity
              onPress={handleClearAll}
              style={[
                styles.clearButton,
                { backgroundColor: 'rgba(255, 68, 68, 0.08)' },
              ]}
              activeOpacity={0.7}
            >
              <Text style={[styles.clearText, { color: colors.primary }]}>
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 1. SEARCH BAR & FILTER BUTTON */}
      <View style={styles.searchSection}>
        <View
          style={[
            styles.searchBar,
            { borderColor: colors.border, backgroundColor: 'white' },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search notes..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearSearchButton}
              activeOpacity={0.7}
            >
              <Text style={styles.clearSearchIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Modal Trigger Button */}
        <TouchableOpacity
          style={[
            styles.filterTriggerButton,
            {
              borderColor:
                attachmentFilter !== 'all' ? colors.primary : colors.border,
              backgroundColor:
                attachmentFilter !== 'all' ? colors.primary + '15' : 'white',
            },
          ]}
          onPress={() => setFilterModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.filterTriggerIcon}>⚙️</Text>
          {attachmentFilter !== 'all' && (
            <View
              style={[
                styles.filterDot,
                { backgroundColor: colors.primary },
              ]}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* 2. FAVORITES / ALL TAB BUTTONS */}
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
              {
                color: filter === 'favorites' ? colors.buttonText : colors.text,
              },
            ]}
          >
            ❤️ Favorites ({favoriteCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* 3. ACTIVE FILTERS BADGES & RESULT COUNT */}
      <View style={styles.resultBar}>
        <Text style={[styles.resultCountText, { color: colors.text }]}>
          {filteredNotes.length}{' '}
          {filteredNotes.length === 1 ? 'note found' : 'notes found'}
        </Text>

        {/* Active attachment filter pill */}
        {attachmentFilter !== 'all' && (
          <TouchableOpacity
            style={[
              styles.activeFilterPill,
              { backgroundColor: colors.primary + '15', borderColor: colors.primary },
            ]}
            onPress={handleClearFilters}
            activeOpacity={0.7}
          >
            <Text style={[styles.activeFilterPillText, { color: colors.primary }]}>
              {getAttachmentFilterLabel(attachmentFilter)} ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Action buttons row (Add note & Settings) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('AddNote')}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            + Add Note
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            ⚙️ Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. NOTE LIST OR EMPTY STATE */}
      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View
            style={[
              styles.emptyIconCircle,
              { backgroundColor: 'white', borderColor: colors.border },
            ]}
          >
            <Text style={styles.emptyIconEmoji}>
              {searchQuery || attachmentFilter !== 'all'
                ? '🔍'
                : filter === 'favorites'
                ? '💖'
                : '📝'}
            </Text>
          </View>
          <Text style={[styles.emptyText, { color: colors.text }]}>
            {searchQuery || attachmentFilter !== 'all'
              ? 'No notes found'
              : filter === 'favorites'
              ? 'No favorite notes yet'
              : 'No notes yet'}
          </Text>
          <Text style={[styles.emptySubText, { color: colors.text }]}>
            {searchQuery || attachmentFilter !== 'all'
              ? 'Try a different search term or clear your active filters.'
              : filter === 'favorites'
              ? 'Mark a note as favorite to see it here.'
              : 'Tap "+ Add Note" to create your first note.'}
          </Text>

          {(searchQuery || attachmentFilter !== 'all') && (
            <TouchableOpacity
              style={[styles.resetSearchButton, { backgroundColor: colors.primary }]}
              onPress={handleResetAllFilters}
              activeOpacity={0.8}
            >
              <Text style={[styles.resetSearchText, { color: colors.buttonText }]}>
                Reset Search & Filters
              </Text>
            </TouchableOpacity>
          )}
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

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        selectedFilter={attachmentFilter}
        onSelectFilter={setAttachmentFilter}
        onClearFilter={handleClearFilters}
        onClose={() => setFilterModalVisible(false)}
      />
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
  profileButton: {
    padding: 8,
    marginRight: 4,
  },
  profileIcon: {
    fontSize: 24,
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 2,
  },
  clearSearchButton: {
    padding: 4,
  },
  clearSearchIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888888',
  },
  filterTriggerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  filterTriggerIcon: {
    fontSize: 20,
  },
  filterDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  resultBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  resultCountText: {
    fontSize: 13,
    fontWeight: '700',
    opacity: 0.6,
  },
  activeFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  activeFilterPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  resetSearchButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 12,
  },
  resetSearchText: {
    fontSize: 14,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 6,
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
    paddingVertical: 8,
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
    marginTop: -20,
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