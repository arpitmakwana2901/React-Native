import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ProfileHeader = ({user}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user?.name?.charAt(0) || 'U'}
        </Text>
      </View>

      <Text style={styles.name}>
        {user?.name || 'Guest User'}
      </Text>

      <Text style={styles.email}>
        {user?.email || 'guest@example.com'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
  },

  email: {
    color: '#6B7280',
    marginTop: 5,
  },
});

export default ProfileHeader;