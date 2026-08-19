import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'React Native Modal',
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;