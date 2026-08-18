import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPostsByUser} from '../redux/slices/postSlice';

const PostsScreen = ({route}) => {
  const {userId} = route.params;

  const dispatch = useDispatch();

  const {posts, loading, error} = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPostsByUser(userId));
  }, [dispatch, userId]);

  // Loading State
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading...
        </Text>
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Something went wrong
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchPostsByUser(userId))}>
          <Text style={styles.retryButtonText}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Success State
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>

      <Text style={styles.subtitle}>
        Posts by User {userId}
      </Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>
              {item.title}
            </Text>

            <Text style={styles.body}>
              {item.body}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No posts found.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 18,
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  postTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    textTransform: 'capitalize',
  },

  body: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
    marginTop: 10,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
  },

  errorText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 18,
  },

  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748B',
    fontSize: 15,
  },
});

export default PostsScreen;