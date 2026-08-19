import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const UserCard = ({user, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.name}>{user.name}</Text>

      <Text style={styles.username}>@{user.username}</Text>

      <Text style={styles.email}>{user.email}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  username: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
  },

  email: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
  },
});

export default UserCard;