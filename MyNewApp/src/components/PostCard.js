import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const PostCard = ({
  post,
  onPress,
  onLike,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}>

      <Text style={styles.user}>
        User {post.userId}
      </Text>

      <Text style={styles.title}>
        {post.title}
      </Text>

      <Text style={styles.body}>
        {post.body}
      </Text>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onLike}>
          <Text style={styles.like}>
            {post.liked ? '❤️' : '🤍'}{' '}
            {post.likeCount || 0}
          </Text>
        </TouchableOpacity>

        <Text>
          💬 {post.commentCount || 0}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },

  user: {
    fontWeight: '700',
    marginBottom: 8,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'capitalize',
  },

  body: {
    color: '#6B7280',
    lineHeight: 20,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  like: {
    fontWeight: '600',
  },
});

export default PostCard;