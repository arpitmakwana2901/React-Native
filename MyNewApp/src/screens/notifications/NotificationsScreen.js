import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  markAsRead,
  markAllAsRead,
} from '../../redux/slices/notificationSlice';

import NotificationCard from '../../components/NotificationCard';
import EmptyState from '../../components/EmptyState';

const NotificationsScreen = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    state => state.notifications.notifications,
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.markAll}
        onPress={() =>
          dispatch(markAllAsRead())
        }>
        <Text style={styles.markText}>
          Mark all as read
        </Text>
      </TouchableOpacity>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <NotificationCard
            notification={item}
            onPress={() =>
              dispatch(markAsRead(item.id))
            }
          />
        )}
        ListEmptyComponent={
          <EmptyState message="No notifications" />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  markAll: {
    alignSelf: 'flex-end',
    margin: 12,
  },

  markText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});

export default NotificationsScreen;