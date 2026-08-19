import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  toggleNotifications,
  toggleDarkMode,
  toggleAutoRefresh,
} from '../../redux/slices/settingsSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const settings = useSelector(
    state => state.settings,
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.row}>
        <Text>Push Notifications</Text>

        <Switch
          value={settings.notificationsEnabled}
          onValueChange={() =>
            dispatch(toggleNotifications())
          }
        />
      </View>

      <View style={styles.row}>
        <Text>Dark Mode</Text>

        <Switch
          value={settings.darkMode}
          onValueChange={() =>
            dispatch(toggleDarkMode())
          }
        />
      </View>

      <View style={styles.row}>
        <Text>Auto Refresh</Text>

        <Switch
          value={settings.autoRefresh}
          onValueChange={() =>
            dispatch(toggleAutoRefresh())
          }
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
});

export default SettingsScreen;