import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Attachment } from '../types';

interface ImagePreviewModalProps {
  visible: boolean;
  attachment: Attachment | null;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  visible,
  attachment,
  onClose,
}) => {
  if (!attachment) return null;

  const imageUri = attachment.url || attachment.thumbnail || attachment.file?.uri;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.container}>
        {/* Top Header with Close (X) button */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {attachment.name || 'Image Preview'}
            </Text>
            {attachment.type && (
              <Text style={styles.subtitle}>
                📷 {attachment.type.toUpperCase()} ATTACHMENT
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Full Screen Image Container with resizeMode contain */}
        <View style={styles.imageWrapper}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorEmoji}>🖼️</Text>
              <Text style={styles.errorText}>Unable to load image preview</Text>
            </View>
          )}
        </View>

        {/* Footer info */}
        {attachment.url && attachment.url.startsWith('http') && (
          <View style={styles.footer}>
            <Text style={styles.urlText} numberOfLines={1}>
              🔗 {attachment.url}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 10 : 14,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
  },
  titleContainer: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: Platform.OS === 'ios' ? -2 : 0,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  errorText: {
    color: '#CCCCCC',
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    alignItems: 'center',
  },
  urlText: {
    color: '#81C784',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default ImagePreviewModal;
