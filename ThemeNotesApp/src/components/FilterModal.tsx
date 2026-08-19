import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export type AttachmentFilterType = 'all' | 'images' | 'videos' | 'links' | 'attachments';

interface FilterOption {
  id: AttachmentFilterType;
  label: string;
  icon: string;
  description: string;
}

interface FilterModalProps {
  visible: boolean;
  selectedFilter: AttachmentFilterType;
  onSelectFilter: (filter: AttachmentFilterType) => void;
  onClose: () => void;
  onClearFilter: () => void;
}

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Notes', icon: '📝', description: 'Show all notes without attachment filter' },
  { id: 'images', label: 'Notes with Images', icon: '🖼️', description: 'Only notes containing image attachments' },
  { id: 'videos', label: 'Notes with Videos', icon: '▶️', description: 'Only notes containing video attachments' },
  { id: 'links', label: 'Notes with Links', icon: '🔗', description: 'Only notes containing link attachments' },
  { id: 'attachments', label: 'Notes with Attachments', icon: '📎', description: 'Notes with any attached files' },
];

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  selectedFilter,
  onSelectFilter,
  onClose,
  onClearFilter,
}) => {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <SafeAreaView style={styles.modalWrapper}>
        <View style={[styles.modalContent, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>Filter Notes</Text>
              <Text style={[styles.headerSubtitle, { color: colors.text }]}>
                Filter notes by attachment types
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
              <Text style={[styles.closeText, { color: colors.text }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Options List */}
          <View style={styles.optionsList}>
            {filterOptions.map((option) => {
              const isSelected = selectedFilter === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    {
                      borderColor: isSelected ? colors.primary : colors.border,
                      backgroundColor: isSelected ? colors.primary + '10' : 'white',
                    },
                  ]}
                  onPress={() => {
                    onSelectFilter(option.id);
                    onClose();
                  }}
                  activeOpacity={0.75}
                >
                  <View style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}>
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={[styles.optionLabel, { color: colors.text }]}>
                      {option.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: colors.text }]}>
                      {option.description}
                    </Text>
                  </View>

                  {/* Radio checkmark indicator */}
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor: isSelected ? colors.primary : colors.border,
                        backgroundColor: isSelected ? colors.primary : 'transparent',
                      },
                    ]}
                  >
                    {isSelected && <Text style={styles.radioCheck}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Action buttons */}
          <View style={styles.footer}>
            {selectedFilter !== 'all' && (
              <TouchableOpacity
                style={[styles.clearButton, { borderColor: colors.primary }]}
                onPress={() => {
                  onClearFilter();
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.clearButtonText, { color: colors.primary }]}>
                  Reset Filter
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={[styles.applyButtonText, { color: colors.buttonText }]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalWrapper: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
    fontWeight: '500',
  },
  closeButton: {
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  optionsList: {
    gap: 10,
    marginBottom: 18,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  optionDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 6,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default FilterModal;
