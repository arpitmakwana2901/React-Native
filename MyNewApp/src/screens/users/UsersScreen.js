import React, {useMemo, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Input from '../../components/Input';
import UserCard from '../../components/UserCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import ErrorView from '../../components/ErrorView';

import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';

const UsersScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: users,
    loading,
    error,
  } = useFetch('/users');

  const filteredUsers = useMemo(() => {
    if (!users) {
      return [];
    }

    const query = debouncedSearch.toLowerCase();

    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query),
    );
  }, [users, debouncedSearch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorView message={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <Input
            value={search}
            onChangeText={setSearch}
            placeholder="Search users..."
          />
        }
        ListEmptyComponent={
          <EmptyState message="No users found" />
        }
        renderItem={({item}) => (
          <UserCard
            user={item}
            onPress={() =>
              navigation.navigate('UserDetails', {
                user: item,
              })
            }
          />
        )}
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

export default UsersScreen;