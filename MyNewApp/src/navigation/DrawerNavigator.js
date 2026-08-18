import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';

import SettingsScreen from '../screens/settings/SettingsScreen';
// import AboutScreen from '../screens/about/AboutScreen';
import HelpSupportScreen from '../screens/support/HelpSupportScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

      {/* <Drawer.Screen
        name="About"
        component={AboutScreen}
      /> */}

      <Drawer.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{
          title: 'Help & Support',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;