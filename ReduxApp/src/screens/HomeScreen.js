import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import UserCard from '../components/UserCard';
import {logout} from '../redux/slices/authSlice';
import {fetchUsers} from '../redux/slices/userSlice';
import {removeUserData} from '../utils/storage';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getAuth, signOut} from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {users, loading, error} = useSelector(state => state.users);
  const {user} = useSelector(state => state.auth);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return users;
    }

    return users.filter(user => {
      return (
        user.name?.toLowerCase().includes(searchText) ||
        user.username?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText)
      );
    });
  }, [users, search]);

  const handleUserPress = userId => {
    navigation.navigate('Posts', {
      userId: userId,
    });
  };

  const handleLogout = async () => {
    try {
      // Clear Google Sign-In session to let user choose another account next time
      const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
      if (hasPreviousSignIn) {
        await GoogleSignin.signOut();
      }

      // Sign out from Firebase Auth
      const auth = getAuth();
      if (auth.currentUser) {
        await signOut(auth);
      }
    } catch (error) {
      console.log('Error during sign out:', error);
    }

    // Remove login information from AsyncStorage
    await removeUserData();

    // Clear authentication state from Redux
    dispatch(logout());

    // Reset navigation stack
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading users...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Users</Text>

          {user?.email && (
            <Text style={styles.userEmail}>
              {user.email}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Result Count */}
      <Text style={styles.resultText}>
        {filteredUsers.length}{' '}
        {filteredUsers.length === 1 ? 'User' : 'Users'}
      </Text>

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <UserCard
            user={item}
            onPress={() => handleUserPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No users found.
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },

  userEmail: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
  },

  logoutButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },

  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },

  searchInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0F172A',
  },

  resultText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
    marginBottom: 10,
  },

  listContent: {
    paddingBottom: 20,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },

  loadingText: {
    marginTop: 10,
    color: '#64748B',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 16,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
    color: '#64748B',
  },
});

export default HomeScreen;