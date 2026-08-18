import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Note } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
  onToggleFavorite,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [isExpanded, setIsExpanded] = useState(false);

  // Navigate to Note Detail Screen
  const handlePress = () => {
    navigation.navigate('NoteDetail', { note });
  };

  // Toggle read more/less
  const toggleReadMore = (e: any) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Check if description is long enough for read more
  const isLongDescription = note.description.length > 80;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: '#FFFFFF',
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.75}
    >
      <View style={styles.content}>
        {/* Title - 1 line */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {note.title}
        </Text>

        {/* Description - 2 lines preview */}
        <Text
          style={[styles.description, { color: colors.text }]}
          numberOfLines={isExpanded ? undefined : 2}
        >
          {note.description || 'No description'}
        </Text>

        {/* Read More / Read Less button */}
        {isLongDescription && (
          <TouchableOpacity
            onPress={toggleReadMore}
            style={styles.readMoreButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.readMoreText, { color: colors.primary }]}>
              {isExpanded ? 'Show Less ▲' : 'Read More ▼'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {/* Favorite Button */}
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            { backgroundColor: note.isFavorite ? 'rgba(255, 68, 68, 0.1)' : 'rgba(0, 0, 0, 0.03)' },
          ]}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite(note.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.favoriteIcon}>
            {note.isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: colors.primary }]}
          onPress={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.deleteText, { color: colors.buttonText }]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    marginVertical: 7,
    marginHorizontal: 18,
    borderWidth: 1,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 14,
    opacity: 0.75,
    lineHeight: 21,
  },
  readMoreButton: {
    marginTop: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  deleteButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  deleteText: {
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.2,
  },
});

export default NoteItem;