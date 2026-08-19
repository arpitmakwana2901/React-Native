import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Attachment } from '../types';
import { useTheme } from '../context/ThemeContext';

interface AttachmentItemProps {
  attachment: Attachment;
  onRename?: (attachment: Attachment) => void;
  onRemove: (id: string) => void;
  onPreview?: (attachment: Attachment) => void;
}

const AttachmentItem: React.FC<AttachmentItemProps> = ({
  attachment,
  onRename,
  onRemove,
  onPreview,
}) => {
  const { colors } = useTheme();

  const getIcon = () => {
    switch (attachment.type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎬';
      case 'camera':
        return '📷';
      case 'link':
        return '🔗';
      default:
        return '📎';
    }
  };

  const imageUri = attachment.url || attachment.thumbnail || attachment.file?.uri;
  const isMedia = (attachment.type === 'image' || attachment.type === 'camera' || attachment.type === 'video') && imageUri;

  const handlePressLeft = () => {
    if (onPreview) {
      onPreview(attachment);
    }
  };

  return (
    <View style={[styles.container, { borderColor: colors.border, backgroundColor: 'white' }]}>
      {/* Tappable attachment info & thumbnail */}
      <TouchableOpacity
        style={styles.leftContent}
        onPress={handlePressLeft}
        activeOpacity={0.75}
        disabled={!onPreview}
      >
        {isMedia ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
            <Text style={styles.icon}>{getIcon()}</Text>
          </View>
        )}

        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {attachment.name || (attachment.type === 'link' ? 'Web Link' : 'Attachment')}
          </Text>
          {attachment.url && (
            <Text style={[styles.url, { color: colors.primary }]} numberOfLines={1}>
              {attachment.url}
            </Text>
          )}
          <View style={[styles.typeBadge, { backgroundColor: colors.primary + '12' }]}>
            <Text style={[styles.typeText, { color: colors.primary }]}>
              {getIcon()} {attachment.type.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action Buttons: Rename & Remove */}
      <View style={styles.actions}>
        {onRename && (
          <TouchableOpacity
            style={[styles.actionButton, styles.renameButton, { borderColor: colors.primary }]}
            onPress={() => onRename(attachment)}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionText, { color: colors.primary }]}>Rename</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton, { backgroundColor: 'rgba(255, 68, 68, 0.08)' }]}
          onPress={() => onRemove(attachment.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionText, { color: '#D32F2F' }]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: 'white',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 22,
  },
  thumbnail: {
    width: 46,
    height: 46,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  url: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renameButton: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  removeButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default AttachmentItem;