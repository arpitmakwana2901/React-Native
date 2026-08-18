import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notificationsEnabled: true,
  darkMode: false,
  autoRefresh: true,
};

const settingsSlice = createSlice({
  name: 'settings',

  initialState,

  reducers: {
    toggleNotifications: state => {
      state.notificationsEnabled =
        !state.notificationsEnabled;
    },

    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
    },

    toggleAutoRefresh: state => {
      state.autoRefresh = !state.autoRefresh;
    },
  },
});

export const {
  toggleNotifications,
  toggleDarkMode,
  toggleAutoRefresh,
} = settingsSlice.actions;

export default settingsSlice.reducer;