import React, {useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {fetchPosts, toggleLike} from '../../redux/slices/postsSlice';

import PostCard from '../../components/PostCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import ErrorView from '../../components/ErrorView';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    posts,
    loading,
    error,
  } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  if (loading && posts.length === 0) {
    return <Loader />;
  }

  if (error && posts.length === 0) {
    return (
      <ErrorView
        message={error}
        onRetry={handleRefresh}
      />
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <EmptyState message="No posts available" />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <PostCard
            post={item}
            onLike={() =>
              dispatch(toggleLike(item.id))
            }
            onPress={() =>
              navigation.navigate('PostDetails', {
                postId: item.id,
                post: item,
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
          />
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
});

export default HomeScreen;