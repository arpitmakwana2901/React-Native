import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import PostDetailsScreen from '../screens/home/PostDetailsScreen';
import UserDetailsScreen from '../screens/users/UserDetailsScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="PostDetails"
        component={PostDetailsScreen}
        options={{title: 'Post Details'}}
      />

      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{title: 'User Details'}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;