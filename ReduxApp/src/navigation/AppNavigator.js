import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PostsScreen from '../screens/PostsScreen';

import {login} from '../redux/slices/authSlice';
import {getUserData} from '../utils/storage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    state => state.auth.isLoggedIn,
  );

  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkLoginSession = async () => {
      try {
        const userData = await getUserData();

        if (userData) {
          dispatch(login(userData));
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setCheckingSession(false);
      }
    };

    checkLoginSession();
  }, [dispatch]);

  if (checkingSession) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="Posts"
              component={PostsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;