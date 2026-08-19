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
import { Attachment } from '../types';

interface RenameModalProps {
  visible: boolean;
  attachment: Attachment | null;
  onClose: () => void;
  onSave: (id: string, newName: string) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({
  visible,
  attachment,
  onClose,
  onSave,
}) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [extension, setExtension] = useState('');

  useEffect(() => {
    if (attachment) {
      const fullName = attachment.name || '';
      const lastDotIndex = fullName.lastIndexOf('.');
      // Preserve extension if present (e.g. .mp4, .jpg, .png)
      if (lastDotIndex > 0 && lastDotIndex < fullName.length - 1) {
        setName(fullName.substring(0, lastDotIndex));
        setExtension(fullName.substring(lastDotIndex));
      } else {
        setName(fullName);
        setExtension('');
      }
    }
  }, [attachment, visible]);

  const handleSave = () => {
    if (!attachment || !name.trim()) return;

    const finalName = extension ? `${name.trim()}${extension}` : name.trim();
    onSave(attachment.id, finalName);
    onClose();
  };

  if (!attachment) return null;

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
            ✏️ Rename Attachment
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>
            Attachment Name
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              value={name}
              onChangeText={setName}
              placeholder="Enter attachment name"
              placeholderTextColor="#A0A0A0"
              autoFocus
              selectTextOnFocus
            />
            {extension ? (
              <View style={[styles.extBadge, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
                <Text style={[styles.extText, { color: colors.primary }]}>{extension}</Text>
              </View>
            ) : null}
          </View>

          {/* Action buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                { backgroundColor: name.trim() ? colors.primary : '#CCCCCC' },
              ]}
              onPress={handleSave}
              disabled={!name.trim()}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>Save</Text>
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
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: 'white',
  },
  extBadge: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extText: {
    fontSize: 14,
    fontWeight: '700',
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
    minWidth: 85,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  saveButton: {},
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default RenameModal;