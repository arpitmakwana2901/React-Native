import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NoteDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NoteDetail'
>;

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { note } = route.params;

  // Format date from id (timestamp)
  const getDate = (id: string) => {
    const date = new Date(parseInt(id));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: colors.buttonText }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.buttonText }]}>
          Note Detail
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Note Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>{note.title}</Text>

        {/* Favorite Status */}
        <View style={styles.statusRow}>
          <Text style={[styles.statusLabel, { color: colors.text }]}>
            Status:
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: note.isFavorite
                  ? 'rgba(255, 68, 68, 0.1)'
                  : 'rgba(0, 0, 0, 0.04)',
                borderColor: note.isFavorite ? '#FF4444' : 'rgba(0,0,0,0.1)',
              },
            ]}
          >
            <Text style={[styles.statusValue, { color: colors.text }]}>
              {note.isFavorite ? '❤️ Favorite' : '🤍 Standard Note'}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Description Card */}
        <Text style={[styles.descriptionLabel, { color: colors.text }]}>
          Description
        </Text>
        <View
          style={[
            styles.descriptionCard,
            { borderColor: colors.border, backgroundColor: '#FFFFFF' },
          ]}
        >
          <Text style={[styles.description, { color: colors.text }]}>
            {note.description || 'No description provided'}
          </Text>
        </View>

        {/* Metadata */}
        <View
          style={[
            styles.metadataContainer,
            { borderColor: colors.border, backgroundColor: '#FFFFFF' },
          ]}
        >
          <Text style={[styles.metadataTitle, { color: colors.text }]}>
            Information
          </Text>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: colors.text }]}>
              📅 Created
            </Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>
              {getDate(note.id)}
            </Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: colors.text }]}>
              📝 Characters
            </Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>
              {note.description.length}
            </Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: colors.text }]}>
              📊 Words
            </Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>
              {note.description.trim() ? note.description.trim().split(/\s+/).length : 0}
            </Text>
          </View>
        </View>

        {/* ID (for debugging) */}
        <Text style={[styles.idText, { color: colors.text }]}>
          ID: {note.id}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'ios' ? 52 : 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    padding: 6,
    minWidth: 60,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 14,
    lineHeight: 34,
    letterSpacing: 0.2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  statusLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginBottom: 20,
    opacity: 0.2,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  descriptionCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0.1,
  },
  metadataContainer: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
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
  metadataTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.7,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  metadataLabel: {
    fontSize: 14,
    opacity: 0.75,
    fontWeight: '500',
  },
  metadataValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  idText: {
    fontSize: 12,
    opacity: 0.35,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default NoteDetailScreen;