import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Color.js';
import {
  User,
  Moon,
  Bell,
  Lock,
  ChevronRight,
} from 'lucide-react-native';

const MenuItem = ({
  icon,
  title,
  onPress,
  showSwitch = false,
  switchValue = false,
  onToggle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.leftContainer}>
        <Icon name={icon} size={22} color="#666" />
        <Text style={styles.title}>{title}</Text>
      </View>

      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onToggle}
          trackColor={{ false: '#D1D5DB', true: Colors.primary }}
          thumbColor="#fff"
        />
      ) : (
        <Icon name="chevron-forward-outline" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
container: {
  flexDirection: 'row',

  justifyContent: 'space-between',

  alignItems: 'center',

  paddingHorizontal: 16,

  paddingVertical: 15,

  borderBottomWidth: 1,

  borderBottomColor: '#ECECEC',

  backgroundColor: '#fff',
},

  menuContainer: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
 leftContainer: {
  flexDirection: 'row',

  alignItems: 'center',
},

title: {
  marginLeft: 12,

  fontSize: 17,

  fontWeight: '500',

  color: '#222',
},
});
