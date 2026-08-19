import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const NotificationCard = ({
  notification,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        !notification.read && styles.unread,
      ]}>

      <View style={styles.dot} />

      <View style={styles.content}>
        <Text style={styles.title}>
          {notification.title}
        </Text>

        <Text style={styles.time}>
          {notification.time}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  unread: {
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
    marginTop: 5,
  },

  content: {
    marginLeft: 12,
    flex: 1,
  },

  title: {
    fontWeight: '600',
  },

  time: {
    color: '#6B7280',
    marginTop: 4,
  },
});

export default NotificationCard;