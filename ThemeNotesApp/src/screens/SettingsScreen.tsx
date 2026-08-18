import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../types';
import ThemeButton from '../components/ThemeButton';

const SettingsScreen = () => {
  const { theme, colors, setTheme } = useTheme();

  const themes: { type: ThemeType; label: string; emoji: string }[] = [
    { type: 'red', label: 'Red', emoji: '🔴' },
    { type: 'green', label: 'Green', emoji: '🟢' },
    { type: 'blue', label: 'Blue', emoji: '🔵' },
    { type: 'yellow', label: 'Yellow', emoji: '🟡' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.text }]}>🎨 Theme Settings</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Select your preferred app theme accent color
      </Text>
      
      <View style={styles.themeList}>
        {themes.map(({ type, label, emoji }) => (
          <ThemeButton
            key={type}
            theme={type}
            label={`${emoji} ${label}`}
            onSelect={() => setTheme(type)}
          />
        ))}
      </View>

      <View style={styles.currentThemeContainer}>
        <View style={[styles.currentThemeBox, { borderColor: colors.primary }]}>
          <Text style={[styles.currentThemeText, { color: colors.text }]}>
            Active Palette
          </Text>
          <Text style={[styles.currentThemeValue, { color: colors.primary }]}>
            {theme.toUpperCase()}
          </Text>
          <View style={[styles.colorPreview, { backgroundColor: colors.primary }]} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginHorizontal: 20,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    opacity: 0.65,
    fontWeight: '500',
  },
  themeList: {
    marginTop: 4,
  },
  currentThemeContainer: {
    marginTop: 28,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  currentThemeBox: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  currentThemeText: {
    fontSize: 13,
    opacity: 0.6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  currentThemeValue: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 6,
    letterSpacing: 0.5,
  },
  colorPreview: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default SettingsScreen;