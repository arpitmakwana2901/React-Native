import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// ✅ Alternative typing without native-stack
type DescriptionEditorScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DescriptionEditor'>;
  route: RouteProp<RootStackParamList, 'DescriptionEditor'>;
};

const DescriptionEditorScreen: React.FC<DescriptionEditorScreenProps> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { description: initialDescription, onSave } = route.params;
  const [description, setDescription] = useState(initialDescription || '');

  const handleSave = () => {
    onSave(description);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={[styles.backText, { color: colors.buttonText }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.buttonText }]}>Description</Text>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveButton}
          activeOpacity={0.8}
        >
          <Text style={[styles.saveText, { color: colors.buttonText }]}>Done ✓</Text>
        </TouchableOpacity>
      </View>

      {/* Description Input */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <TextInput
          style={[
            styles.textInput,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: '#FFFFFF',
            },
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter long description..."
          placeholderTextColor="#A0A0A0"
          multiline
          scrollEnabled={true}
          textAlignVertical="top"
          autoFocus={true}
        />
      </ScrollView>

      {/* Character Count */}
      <View style={[styles.footer, { borderTopColor: 'rgba(0, 0, 0, 0.08)', backgroundColor: colors.background }]}>
        <Text style={[styles.charCount, { color: colors.text }]}>
          {description.length} characters • {description.trim() ? description.trim().split(/\s+/).length : 0} words
        </Text>
      </View>
    </KeyboardAvoidingView>
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
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  saveText: {
    fontSize: 15,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    padding: 18,
  },
  scrollContent: {
    flexGrow: 1,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 320,
    textAlignVertical: 'top',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  footer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  charCount: {
    fontSize: 13,
    opacity: 0.65,
    fontWeight: '500',
  },
});

export default DescriptionEditorScreen;
