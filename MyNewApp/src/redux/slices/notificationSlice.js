import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    {
      id: 1,
      title: 'John liked your post',
      time: '5 min ago',
      read: false,
    },
    {
      id: 2,
      title: 'Sarah started following you',
      time: '20 min ago',
      read: false,
    },
    {
      id: 3,
      title: 'You have a new comment',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 4,
      title: 'Your post received 10 likes',
      time: '2 hours ago',
      read: false,
    },
  ],
};

const notificationSlice = createSlice({
  name: 'notifications',

  initialState,

  reducers: {
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        item => item.id === action.payload,
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllAsRead: state => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
  },

  selectors: {
    unreadCount: state =>
      state.notifications.filter(
        notification => !notification.read,
      ).length,
  },
});

export const {
  markAsRead,
  markAllAsRead,
} = notificationSlice.actions;

export default notificationSlice.reducer;