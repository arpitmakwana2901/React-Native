import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import api from '../../api/axios';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await api.get(`/posts?userId=${userId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch posts',
      );
    }
  },
);

const postSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      // Request started
      .addCase(fetchPostsByUser.pending, state => {
        state.loading = true;
        state.error = null;
      })

      // Request successful
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })

      // Request failed
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default postSlice.reducer;