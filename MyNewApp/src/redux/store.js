import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import notificationReducer from './slices/notificationSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
  },
});