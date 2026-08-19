import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface LinkModalProps {
  visible: boolean;
  initialTitle?: string;
  initialUrl?: string;
  onClose: () => void;
  onSave: (title: string, url: string) => void;
}

const LinkModal: React.FC<LinkModalProps> = ({
  visible,
  initialTitle = '',
  initialUrl = '',
  onClose,
  onSave,
}) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState(initialTitle);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setTitle(initialTitle || '');
    setUrl(initialUrl || '');
  }, [initialTitle, initialUrl, visible]);

  const handleSave = () => {
    if (!url.trim()) {
      return;
    }
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    const finalTitle = title.trim() || formattedUrl;
    onSave(finalTitle, formattedUrl);
    setTitle('');
    setUrl('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            {initialUrl ? '🔗 Edit Link' : '🔗 Add Link'}
          </Text>

          {/* Link Title */}
          <Text style={[styles.label, { color: colors.text }]}>Link Title (Optional)</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="e.g. Documentation, My Portfolio"
            placeholderTextColor="#A0A0A0"
            value={title}
            onChangeText={setTitle}
          />

          {/* Link URL */}
          <Text style={[styles.label, { color: colors.text }]}>URL *</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="https://example.com"
            placeholderTextColor="#A0A0A0"
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Save Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  saveButton: {},
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LinkModal;
