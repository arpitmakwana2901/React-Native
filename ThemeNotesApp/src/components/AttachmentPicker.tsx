import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface AttachmentPickerProps {
  onSelectImage: () => void;
  onSelectVideo: () => void;
  onOpenCamera: () => void;
  onAddLink: () => void;
}

const AttachmentPicker: React.FC<AttachmentPickerProps> = ({
  onSelectImage,
  onSelectVideo,
  onOpenCamera,
  onAddLink,
}) => {
  const { colors } = useTheme();

  const options = [
    { icon: '🖼️', label: 'Images', onPress: onSelectImage },
    { icon: '▶️', label: 'Videos', onPress: onSelectVideo },
    { icon: '📷', label: 'Camera', onPress: onOpenCamera },
    { icon: '🔗', label: 'Link', onPress: onAddLink },
  ];

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            {
              borderColor: colors.border,
              backgroundColor: 'white',
            },
          ]}
          onPress={option.onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.optionIcon}>{option.icon}</Text>
          <Text style={[styles.optionLabel, { color: colors.text }]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 8,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  optionIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AttachmentPicker;