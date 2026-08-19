import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store/store';
import { updateNote } from '../store/notesSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Attachment } from '../types';
import AttachmentPicker from '../components/AttachmentPicker';
import AttachmentItem from '../components/AttachmentItem';
import LinkModal from '../components/LinkModal';
import ImagePreviewModal from '../components/ImagePreviewModal';
import VideoPlayerModal from '../components/VideoPlayerModal';
import RenameModal from '../components/RenameModal';
import { useMediaPicker } from '../hooks/useMediaPicker';

type EditNoteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditNote'
>;

const EditNoteScreen: React.FC<EditNoteScreenProps> = ({
  navigation,
  route,
}) => {
  const { noteId } = route.params;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const note = notes.find((n) => n.id === noteId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Link Modal state
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [editingLinkAttachment, setEditingLinkAttachment] = useState<Attachment | null>(null);

  // Image Preview Modal state
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

  // Video Player Modal state
  const [selectedVideoAttachment, setSelectedVideoAttachment] = useState<Attachment | null>(null);
  const [videoPlayerVisible, setVideoPlayerVisible] = useState(false);

  // Rename Modal state
  const [renamingAttachment, setRenamingAttachment] = useState<Attachment | null>(null);
  const [renameModalVisible, setRenameModalVisible] = useState(false);

  const {
    pickImage,
    pickVideo,
    captureImage,
    isLoading: mediaLoading,
  } = useMediaPicker();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setAttachments(note.attachments || []);
    } else {
      Alert.alert('Error', 'Note not found');
      navigation.goBack();
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(
        updateNote({
          id: noteId,
          updates: {
            title: title.trim(),
            description: description.trim(),
            attachments: attachments,
          },
        })
      );
      Alert.alert('Success', 'Note updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = async () => {
    const attachment = await pickImage();
    if (attachment) {
      setAttachments((prev) => [...prev, attachment]);
    }
  };

  const handleAddVideo = async () => {
    const attachment = await pickVideo();
    if (attachment) {
      setAttachments((prev) => [...prev, attachment]);
    }
  };

  const handleOpenCamera = async () => {
    const attachment = await captureImage();
    if (attachment) {
      setAttachments((prev) => [...prev, attachment]);
    }
  };

  const handleOpenLinkModal = () => {
    setEditingLinkAttachment(null);
    setLinkModalVisible(true);
  };

  const handleSaveLink = (linkTitle: string, url: string) => {
    if (editingLinkAttachment) {
      setAttachments((prev) =>
        prev.map((a) =>
          a.id === editingLinkAttachment.id ? { ...a, name: linkTitle, url: url } : a
        )
      );
    } else {
      const newAttachment: Attachment = {
        id: Date.now().toString(),
        type: 'link',
        name: linkTitle,
        url: url,
      };
      setAttachments((prev) => [...prev, newAttachment]);
    }
  };

  const handleRemoveAttachment = (id: string) => {
    Alert.alert(
      'Remove Attachment',
      'Are you sure you want to remove this attachment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setAttachments((prev) => prev.filter((a) => a.id !== id)),
        },
      ]
    );
  };

  // ✅ Handle Open Link
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

  // ✅ Handle Tapping Attachment Row (Image / Video / Link)
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

  // ✅ Handle Rename Action
  const handleRenamePress = (attachment: Attachment) => {
    setRenamingAttachment(attachment);
    setRenameModalVisible(true);
  };

  const handleRenameSave = (id: string, newName: string) => {
    setAttachments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, name: newName } : a))
    );
  };

  if (!note) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text }}>Loading note...</Text>
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {/* Header - Safe Area Inset */}
          <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) + 8 }]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={[styles.backText, { color: colors.text }]}>← Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Edit Note</Text>
            <TouchableOpacity onPress={handleSave} disabled={isLoading}>
              <Text style={[styles.saveText, { color: colors.primary }]}>
                {isLoading ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Title</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: 'white',
                },
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter note title"
              placeholderTextColor="#999"
            />
          </View>

          {/* Description - Scrollable TextInput with min 6-7 lines height */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.text }]}>Description</Text>
              <Text style={[styles.charBadge, { color: colors.primary }]}>
                {description.length} chars
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: 'white',
                },
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description..."
              placeholderTextColor="#999"
              multiline
              scrollEnabled={true}
              textAlignVertical="top"
            />
          </View>

          {/* Attachments Section */}
          <View style={styles.attachmentSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              📎 Attachments
            </Text>
            <AttachmentPicker
              onSelectImage={handleAddImage}
              onSelectVideo={handleAddVideo}
              onOpenCamera={handleOpenCamera}
              onAddLink={handleOpenLinkModal}
            />
            {mediaLoading && (
              <View style={styles.mediaLoadingContainer}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={[styles.mediaLoadingText, { color: colors.text }]}>
                  Opening media...
                </Text>
              </View>
            )}
          </View>

          {/* Attachment List */}
          {attachments.length > 0 && (
            <View style={styles.attachmentList}>
              <Text style={[styles.attachmentListTitle, { color: colors.text }]}>
                Attached Files ({attachments.length})
              </Text>
              {attachments.map((attachment) => (
                <AttachmentItem
                  key={attachment.id}
                  attachment={attachment}
                  onRename={handleRenamePress}
                  onRemove={handleRemoveAttachment}
                  onPreview={handleAttachmentPreview}
                />
              ))}
            </View>
          )}

          {/* Updated date */}
          {note.updatedAt && (
            <Text style={[styles.dateText, { color: colors.text }]}>
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Link Modal */}
      <LinkModal
        visible={linkModalVisible}
        initialTitle={editingLinkAttachment?.name || ''}
        initialUrl={editingLinkAttachment?.url || ''}
        onClose={() => {
          setLinkModalVisible(false);
          setEditingLinkAttachment(null);
        }}
        onSave={handleSaveLink}
      />

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

      {/* Rename Modal */}
      <RenameModal
        visible={renameModalVisible}
        attachment={renamingAttachment}
        onClose={() => {
          setRenameModalVisible(false);
          setRenamingAttachment(null);
        }}
        onSave={handleRenameSave}
      />
    </>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    marginBottom: 8,
  },
  backButton: {
    padding: 6,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    padding: 6,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  charBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    minHeight: 155,
    maxHeight: 220,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  attachmentSection: {
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  mediaLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  mediaLoadingText: {
    marginLeft: 10,
    fontSize: 14,
  },
  attachmentList: {
    marginTop: 8,
  },
  attachmentListTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EditNoteScreen;