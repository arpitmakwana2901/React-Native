import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DescriptionEditorScreen from '../screens/DescriptionEditorScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen'; // ✅ NEW
import { useTheme } from '../context/ThemeContext';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          },
          headerTintColor: colors.buttonText,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
            letterSpacing: 0.3,
          },
          gestureEnabled: true,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: '✨ Theme Notes',
          }}
        />
        <Stack.Screen 
          name="AddNote" 
          component={AddNoteScreen} 
          options={{
            title: '📝 New Note',
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            title: '⚙️ Settings',
          }}
        />
        <Stack.Screen
          name="DescriptionEditor"
          component={DescriptionEditorScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* ✅ NEW - Note Detail Screen */}
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{
            headerShown: false, // Custom header in screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;