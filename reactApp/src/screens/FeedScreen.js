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
import PostCard from '../components/PostCard';
import useFetch from '../hooks/useFetch';

const FeedScreen = ({ navigation, route }) => {
  const email = route?.params?.email || '';

  const {
    data: products,
    loading,
    refreshing,
    onRefresh,
  } = useFetch('/products', 'products');

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
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
        email={email}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard item={item} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
      />
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  row: {
    justifyContent: 'space-between',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});