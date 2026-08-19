import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/posts');

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch posts',
      );
    }
  },
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    toggleLike: (state, action) => {
      const post = state.posts.find(
        item => item.id === action.payload,
      );

      if (post) {
        post.liked = !post.liked;

        if (post.liked) {
          post.likeCount = (post.likeCount || 0) + 1;
        } else {
          post.likeCount = Math.max(
            0,
            (post.likeCount || 0) - 1,
          );
        }
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;

        state.posts = action.payload.map(post => ({
          ...post,
          liked: false,
          likeCount: Math.floor(Math.random() * 100),
          commentCount: Math.floor(Math.random() * 30),
        }));
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {toggleLike} = postsSlice.actions;

export default postsSlice.reducer;