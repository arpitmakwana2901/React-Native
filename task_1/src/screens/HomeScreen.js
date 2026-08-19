import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import Colors from '../constants/Colors';
import EmployeeCard from '../components/EmployeeCard';
import useFetch from '../hooks/useFetch';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const {
    data: users,
    loading,
    refreshing,
    onRefresh,
  } = useFetch('/users', 'users');

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <TextInput
        placeholder="Search Employee..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <EmployeeCard
            item={item}
            onPress={() =>
              navigation.navigate('Detail', {
                user: item,
              })
            }
          />
        )}
      />

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
  },

  search: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});