import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Attachment } from '../types';
import AttachmentItem from '../components/AttachmentItem';
import ImagePreviewModal from '../components/ImagePreviewModal';
import VideoPlayerModal from '../components/VideoPlayerModal';

type NoteDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NoteDetail'
>;

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { note } = route.params;

  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

  // Video Player state
  const [selectedVideoAttachment, setSelectedVideoAttachment] = useState<Attachment | null>(null);
  const [videoPlayerVisible, setVideoPlayerVisible] = useState(false);

  const handleOpenLink = async (url?: string) => {
    if (!url || !url.trim()) {
      Alert.alert('Cannot Open Link', 'No URL available for this link.');
      return;
    }

    let validUrl = url.trim();
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = `https://${validUrl}`;
    }

    try {
      await Linking.openURL(validUrl);
    } catch (error) {
      console.error('Link open error:', error);
      Alert.alert(
        'Cannot Open Link',
        `Unable to open "${validUrl}". Please check the web address or ensure a browser is installed.`
      );
    }
  };

  const handleAttachmentPreview = (attachment: Attachment) => {
    if (attachment.type === 'video') {
      setSelectedVideoAttachment(attachment);
      setVideoPlayerVisible(true);
    } else if (attachment.type === 'link') {
      handleOpenLink(attachment.url);
    } else {
      setPreviewAttachment(attachment);
      setImagePreviewVisible(true);
    }
  };

  const getDate = (id: string) => {
    const timeNum = parseInt(id, 10);
    const date = isNaN(timeNum) ? new Date() : new Date(timeNum);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header - Safe Area Inset */}
      <View style={[styles.header, { backgroundColor: colors.primary, paddingTop: Math.max(insets.top, 16) + 8 }]}>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('EditNote', { noteId: note.id })}
          style={styles.editButton}
          activeOpacity={0.7}
        >
          <Text style={[styles.editText, { color: colors.buttonText }]}>✏️ Edit</Text>
        </TouchableOpacity>
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
          <Text style={[styles.statusLabel, { color: colors.text }]}>Status:</Text>
          <Text style={[styles.statusValue, { color: colors.text }]}>
            {note.isFavorite ? ' ❤️ Favorite' : ' 🤍 Not Favorite'}
          </Text>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Description Label & Scroll Box (Min 6-7 lines visible height) */}
        <Text style={[styles.descriptionLabel, { color: colors.text }]}>
          Description
        </Text>
        <View style={[styles.descriptionContainer, { borderColor: colors.border }]}>
          <ScrollView
            style={styles.descriptionScrollView}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          >
            <Text style={[styles.description, { color: colors.text }]}>
              {note.description || 'No description provided'}
            </Text>
          </ScrollView>
        </View>

        {/* Attachments */}
        {note.attachments && note.attachments.length > 0 && (
          <>
            <Text style={[styles.attachmentsLabel, { color: colors.text }]}>
              📎 Attachments ({note.attachments.length})
            </Text>
            <View style={styles.attachmentsContainer}>
              {note.attachments.map((attachment, index) => (
                <AttachmentItem
                  key={attachment.id || index.toString()}
                  attachment={attachment}
                  onRemove={() => {}} // Read-only in detail view
                  onPreview={handleAttachmentPreview}
                />
              ))}
            </View>
          </>
        )}

        {/* Metadata */}
        <View style={[styles.metadataContainer, { borderColor: colors.border }]}>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: colors.text }]}>
              📅 Created:
            </Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>
              {getDate(note.id)}
            </Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: colors.text }]}>
              📝 Characters:
            </Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>
              {note.description.length}
            </Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={[styles.metadataLabel, { color: colors.text }]}>
              📊 Words:
            </Text>
            <Text style={[styles.metadataValue, { color: colors.text }]}>
              {note.description.trim() ? note.description.trim().split(/\s+/).length : 0}
            </Text>
          </View>
          {note.updatedAt && (
            <View style={styles.metadataRow}>
              <Text style={[styles.metadataLabel, { color: colors.text }]}>
                🔄 Updated:
              </Text>
              <Text style={[styles.metadataValue, { color: colors.text }]}>
                {new Date(note.updatedAt).toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.idText, { color: colors.text }]}>ID: {note.id}</Text>
      </ScrollView>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        visible={imagePreviewVisible}
        attachment={previewAttachment}
        onClose={() => {
          setImagePreviewVisible(false);
          setPreviewAttachment(null);
        }}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        visible={videoPlayerVisible}
        attachment={selectedVideoAttachment}
        onClose={() => {
          setVideoPlayerVisible(false);
          setSelectedVideoAttachment(null);
        }}
      />
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
    paddingBottom: 12,
  },
  backButton: {
    padding: 6,
    minWidth: 60,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  editButton: {
    padding: 6,
    minWidth: 60,
    alignItems: 'flex-end',
  },
  editText: {
    fontSize: 15,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    lineHeight: 32,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 6,
  },
  statusValue: {
    fontSize: 15,
  },
  divider: {
    height: 1,
    marginBottom: 18,
    opacity: 0.3,
  },
  descriptionLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    minHeight: 155, // Minimum 6-7 lines height
    maxHeight: 220, // Enables vertical scrolling smoothly
  },
  descriptionScrollView: {
    flex: 1,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
  },
  attachmentsLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  attachmentsContainer: {
    marginBottom: 20,
    gap: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  attachmentIcon: {
    fontSize: 22,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 10,
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: '700',
  },
  attachmentUrl: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  metadataContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  metadataLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  metadataValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  idText: {
    fontSize: 11,
    opacity: 0.4,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default NoteDetailScreen;