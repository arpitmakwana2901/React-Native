import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {

      const data =
        await AsyncStorage.getItem(
          'USER_DATA',
        );

      if (data) {
        setUser(JSON.parse(data));
      } else {
        setUser(null);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <ActivityIndicator
          size="large"
          color="#007AFF"
        />

      </View>
    );
  }

  return (
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

        {user ? (

          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
          />

        ) : (

          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />

        )}

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;