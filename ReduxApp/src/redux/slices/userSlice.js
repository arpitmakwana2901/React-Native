import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import api from '../../api/axios';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/users');

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch users',
      );
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      // API Request Started
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })

      // API Request Successful
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })

      // API Request Failed
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default userSlice.reducer;