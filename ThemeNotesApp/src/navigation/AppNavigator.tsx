import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import AddNoteScreen from '../screens/AddNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen'; // ✅ NEW
import SettingsScreen from '../screens/SettingsScreen';
import DescriptionEditorScreen from '../screens/DescriptionEditorScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
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
          name="MainTabs" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="AddNote" 
          component={AddNoteScreen} 
          options={{ 
            title: '📝 New Note',
            headerShown: false,
          }}
        />
        
        {/* ✅ NEW - Edit Note Screen */}
        <Stack.Screen 
          name="EditNote" 
          component={EditNoteScreen} 
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: '⚙️ Settings' }}
        />
        
        <Stack.Screen
          name="DescriptionEditor"
          component={DescriptionEditorScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;