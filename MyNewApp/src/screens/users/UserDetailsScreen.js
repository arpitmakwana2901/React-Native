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

const UserDetailsScreen = ({route}) => {
  const {user} = route.params;

  const {
    data: posts,
    loading,
    error,
  } = useFetch(`/posts?userId=${user.id}`);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorView message={error} />;
  }

  return (
    <FlatList
      data={posts || []}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0)}
            </Text>
          </View>

          <Text style={styles.name}>
            {user.name}
          </Text>

          <Text>@{user.username}</Text>
          <Text>{user.email}</Text>
          <Text>{user.phone}</Text>
          <Text>{user.website}</Text>

          <Text style={styles.section}>
            Company
          </Text>

          <Text>{user.company.name}</Text>

          <Text style={styles.section}>
            Address
          </Text>

          <Text>
            {user.address.street}, {user.address.city}
          </Text>

          <Text style={styles.section}>
            User Posts
          </Text>
        </View>
      }
      ListEmptyComponent={
        <EmptyState message="No posts found" />
      }
      renderItem={({item}) => (
        <View style={styles.post}>
          <Text style={styles.postTitle}>
            {item.title}
          </Text>

          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  profile: {
    padding: 20,
    alignItems: 'center',
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
  },

  section: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
  },

  post: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  postTitle: {
    fontWeight: '700',
    marginBottom: 6,
  },
});

export default UserDetailsScreen;