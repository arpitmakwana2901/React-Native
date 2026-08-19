import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';

import Header from '../components/Header';
import UserCard from '../components/UserCard';
import useFetch from '../hooks/useFetch';

const UsersScreen = ({ navigation }) => {

  const {
    data: users,
    loading,
    refreshing,
    onRefresh,
  } = useFetch('/users', 'users');

  const createRows = () => {
    const rows = [];
    let i = 0;

    while (i < users.length) {

      rows.push({
        type: 'double',
        data: users.slice(i, i + 2),
      });

      i += 2;

      if (i < users.length) {
        rows.push({
          type: 'single',
          data: [users[i]],
        });

        i++;
      }
    }

    return rows;
  };

  const rows = createRows();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#007AFF"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <Header
        navigation={navigation}
        title="Users"
        subtitle="Browse all users"
      />

      <FlatList
        data={rows}
        keyExtractor={(item, index) =>
          index.toString()
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
        renderItem={({ item }) => {

          if (item.type === 'double') {
            return (
              <View style={styles.doubleRow}>
                {item.data.map(user => (
                  <UserCard
                    key={user.id}
                    item={user}
                    fullWidth={false}
                  />
                ))}
              </View>
            );
          }

          return (
            <View style={styles.singleRow}>
              <UserCard
                item={item.data[0]}
                fullWidth={true}
              />
            </View>
          );
        }}
      />

    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    paddingHorizontal: 12,
    paddingBottom: 25,
    paddingTop: 8,
  },

  doubleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  singleRow: {
    alignItems: 'center',
    marginBottom: 15,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});