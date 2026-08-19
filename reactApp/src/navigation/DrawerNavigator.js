import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from '../navigation/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,

        drawerType: 'front',

        drawerStyle: {
          width: 300,
        },

        drawerActiveTintColor: '#007AFF',

        drawerInactiveTintColor: '#666',

        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -15,
          fontWeight: '600',
        },

        overlayColor: 'rgba(0,0,0,0.35)',

        sceneContainerStyle: {
          backgroundColor: '#F5F7FA',
        },
      }}>

      <Drawer.Screen
        name="Dashboard"
        component={BottomTabNavigator}
        options={{
          title: 'Dashboard',
        }}
      />

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;