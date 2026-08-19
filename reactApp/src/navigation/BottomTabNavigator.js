import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import FeedScreen from '../screens/FeedScreen';
import UsersScreen from '../screens/UserScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: false,

        tabBarStyle: {
          height: 65,
          borderTopWidth: 0,
          elevation: 8,
          paddingBottom: 10,
        },
      })}>

      <Tab.Screen
        name="Home"
        component={FeedScreen}
        initialParams={{
          drawerNavigation: navigation,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={28}
              color={focused ? '#007AFF' : '#777'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Users"
        component={UsersScreen}
        initialParams={{
          drawerNavigation: navigation,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? 'people' : 'people-outline'}
              size={28}
              color={focused ? '#007AFF' : '#777'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        initialParams={{
          drawerNavigation: navigation,
        }}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity
              style={{
                width: 58,
                height: 58,
                borderRadius: 29,
                backgroundColor: '#007AFF',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 25,
              }}>
              <Icon
                name="add"
                size={34}
                color="#fff"
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{
          drawerNavigation: navigation,
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused
                  ? 'person-circle'
                  : 'person-circle-outline'
              }
              size={30}
              color={focused ? '#007AFF' : '#777'}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;