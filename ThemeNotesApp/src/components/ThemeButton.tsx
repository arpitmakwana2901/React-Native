import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import { ThemeType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ThemeButtonProps {
  theme: ThemeType;
  label: string;
  onSelect: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme, label, onSelect }) => {
  const { theme: currentTheme, colors } = useTheme();
  const isSelected = currentTheme === theme;

  const getThemeColor = (): string => {
    const themeColorMap = { 
      red: '#FF4444', 
      green: '#44BB44', 
      blue: '#4488FF', 
      yellow: '#FFD700' 
    };
    return themeColorMap[theme];
  };

  const themeColor = getThemeColor();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: isSelected ? themeColor : 'rgba(0, 0, 0, 0.08)',
          borderWidth: isSelected ? 2 : 1,
          backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.95)' : 'white',
        },
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.colorCircle, { backgroundColor: themeColor }]} />
        <Text style={[styles.label, { color: colors.text, fontWeight: isSelected ? '700' : '600' }]}>
          {label}
        </Text>
      </View>
      {isSelected ? (
        <View style={[styles.checkmarkContainer, { backgroundColor: themeColor }]}>
          <Text style={[styles.checkmark, { color: theme === 'yellow' ? '#000000' : '#FFFFFF' }]}>✓</Text>
        </View>
      ) : (
        <View style={styles.unselectedIndicator} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginVertical: 6,
    borderRadius: 14,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  label: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
  checkmarkContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  unselectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
  },
});

export default ThemeButton;