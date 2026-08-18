import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import ErrorView from '../../components/ErrorView';

const PostDetailsScreen = ({route}) => {
  const {postId, post} = route.params;

  const {
    data: comments,
    loading,
    error,
  } = useFetch(`/comments?postId=${postId}`);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorView message={error} />;
  }

  return (
    <FlatList
      data={comments || []}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>
            {post.title}
          </Text>

          <Text style={styles.body}>
            {post.body}
          </Text>

          <Text style={styles.stats}>
            ❤️ {post.likeCount || 0}  
            💬 {post.commentCount || 0}
          </Text>

          <Text style={styles.commentsTitle}>
            Comments
          </Text>
        </View>
      }
      ListEmptyComponent={
        <EmptyState message="No comments found" />
      }
      renderItem={({item}) => (
        <View style={styles.comment}>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.email}>
            {item.email}
          </Text>

          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginBottom: 12,
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
  },

  stats: {
    marginTop: 15,
    fontWeight: '600',
  },

  commentsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 25,
  },

  comment: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  name: {
    fontWeight: '700',
  },

  email: {
    color: '#6B7280',
    marginBottom: 6,
  },
});

export default PostDetailsScreen;