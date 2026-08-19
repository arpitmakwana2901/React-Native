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
  const [lastTap, setLastTap] = useState<number>(0);

  const handlePress = () => {
    navigation.navigate('NoteDetail', { note });
  };

  const handleEdit = (e: any) => {
    e.stopPropagation();
    navigation.navigate('EditNote', { noteId: note.id });
  };

  const handleDescriptionPress = (e: any) => {
    e.stopPropagation();
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected -> Open Edit screen
      navigation.navigate('EditNote', { noteId: note.id });
    } else {
      setLastTap(now);
    }
  };

  const toggleReadMore = (e: any) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const isLongDescription = note.description.length > 80;

  const getDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: colors.border, backgroundColor: 'white' }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {note.title}
        </Text>

        {/* Description - Double tap to edit */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleDescriptionPress}
          style={styles.descriptionWrapper}
        >
          <Text
            style={[styles.description, { color: colors.text }]}
            numberOfLines={isExpanded ? undefined : 2}
          >
            {note.description || 'No description'}
          </Text>
        </TouchableOpacity>

        {/* Read More */}
        {isLongDescription && (
          <TouchableOpacity onPress={toggleReadMore} style={styles.readMoreButton}>
            <Text style={[styles.readMoreText, { color: colors.primary }]}>
              {isExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Attachment indicator */}
        {note.attachments && note.attachments.length > 0 && (
          <View style={[styles.attachmentBadge, { backgroundColor: colors.primary + '15' }]}>
            <Text style={[styles.attachmentIndicator, { color: colors.primary }]}>
              📎 {note.attachments.length} attachment{note.attachments.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {/* Updated date */}
        {note.updatedAt && (
          <Text style={[styles.dateText, { color: colors.text }]}>
            Updated: {getDate(note.updatedAt)}
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
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

        {/* Edit Button */}
        <TouchableOpacity
          style={[
            styles.editButton,
            { borderColor: colors.primary, backgroundColor: colors.primary + '12' },
          ]}
          onPress={handleEdit}
          activeOpacity={0.7}
        >
          <Text style={[styles.editText, { color: colors.primary }]}>✏️ Edit</Text>
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
          <Text style={[styles.deleteText, { color: colors.buttonText }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  descriptionWrapper: {
    paddingVertical: 2,
  },
  description: {
    fontSize: 14,
    opacity: 0.75,
    lineHeight: 20,
  },
  readMoreButton: {
    marginTop: 4,
    paddingVertical: 2,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
  },
  attachmentBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  attachmentIndicator: {
    fontSize: 11,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 11,
    opacity: 0.4,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  favoriteButton: {
    padding: 6,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    minWidth: 58,
    alignItems: 'center',
  },
  deleteText: {
    fontWeight: '700',
    fontSize: 12,
  },
});

export default NoteItem;