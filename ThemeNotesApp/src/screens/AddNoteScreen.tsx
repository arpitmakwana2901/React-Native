import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/notesSlice';
import { useTheme } from '../context/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type AddNoteScreenProps = NativeStackScreenProps<RootStackParamList, 'AddNote'>;

const AddNoteScreen: React.FC<AddNoteScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return;
    }

    try {
      setIsLoading(true);
      dispatch(addNote({ title: title.trim(), description: description.trim() }));

      Alert.alert('Success', 'Note added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add note');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ NEW - Navigate to Description Editor
  const openDescriptionEditor = () => {
    navigation.navigate('DescriptionEditor', {
      description: description,
      onSave: (newDescription: string) => {
        setDescription(newDescription);
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.text }]}>Title *</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text, backgroundColor: '#FFFFFF' },
            ]}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter note title..."
            placeholderTextColor="#A0A0A0"
            maxLength={50}
          />

          <Text style={[styles.label, { color: colors.text }]}>Description *</Text>
          
          {/* ✅ NEW - Description Preview */}
          <TouchableOpacity
            style={[
              styles.descriptionPreview,
              { borderColor: colors.border, backgroundColor: '#FFFFFF' },
            ]}
            onPress={openDescriptionEditor}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.descriptionPreviewText,
                { color: description ? colors.text : '#A0A0A0' },
              ]}
              numberOfLines={3}
            >
              {description || 'Tap to enter long description...'}
            </Text>
            <View style={[styles.editBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.editBadgeText, { color: colors.buttonText }]}>
                View / Edit ✏️
              </Text>
            </View>
          </TouchableOpacity>

          {/* ✅ NEW - Show description length */}
          {description.length > 0 && (
            <Text style={[styles.charCount, { color: colors.text }]}>
              {description.length} characters
            </Text>
          )}

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddNote}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.buttonText} />
            ) : (
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                ✨ Add Note
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
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
  descriptionPreview: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
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
  descriptionPreviewText: {
    fontSize: 15,
    flex: 1,
    marginRight: 12,
    lineHeight: 22,
  },
  editBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  editBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  charCount: {
    fontSize: 12,
    opacity: 0.65,
    marginBottom: 20,
    textAlign: 'right',
    fontWeight: '500',
  },
  addButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default AddNoteScreen;