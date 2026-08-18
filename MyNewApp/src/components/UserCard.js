import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const UserCard = ({user, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name.charAt(0)}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {user.name}
        </Text>

        <Text style={styles.username}>
          @{user.username}
        </Text>

        <Text style={styles.email}>
          {user.email}
        </Text>

        <Text style={styles.phone}>
          {user.phone}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 14,
    borderRadius: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  username: {
    color: '#4F46E5',
  },

  email: {
    color: '#6B7280',
    marginTop: 3,
  },

  phone: {
    color: '#6B7280',
  },
});

export default UserCard;