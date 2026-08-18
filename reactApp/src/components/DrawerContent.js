import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

import Images from '../constants/Images';

const DrawerContent = ({
  navigation,
}) => {
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] =
    useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem(
        'USER_DATA',
      );

      if (data) {
        const userData = JSON.parse(data);

        setUser(userData);

        const image =
          await AsyncStorage.getItem(
            `PROFILE_IMAGE_${userData.email}`,
          );

        if (image) {
          setProfileImage(image);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(
      'USER_DATA',
    );

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };

  const DrawerItem = (
    icon,
    title,
    onPress,
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}>
      <Icon
        name={icon}
        size={24}
        color="#007AFF"
      />

      <Text style={styles.itemText}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
      }}>
      {/* Header */}

      <View style={styles.header}>
        <Image
          source={
            profileImage
              ? {
                  uri: profileImage,
                }
              : Images.profile
          }
          style={styles.image}
        />

        <Text style={styles.name}>
          {user.name || 'User'}
        </Text>

        <Text style={styles.email}>
          {user.email}
        </Text>
      </View>

      {/* Menu */}

      <View style={styles.menu}>

        {DrawerItem(
          'home-outline',
          'Home',
          () =>
            navigation.navigate(
              'HomeDrawer',
            ),
        )}

        {DrawerItem(
          'people-outline',
          'Users',
          () =>
            navigation.navigate(
              'Users',
            ),
        )}

        {DrawerItem(
          'add-circle-outline',
          'Add',
          () =>
            navigation.navigate(
              'Add',
            ),
        )}

        {DrawerItem(
          'person-outline',
          'Profile',
          () =>
            navigation.navigate(
              'Profile',
            ),
        )}

      </View>

      <View
        style={{
          flex: 1,
        }}
      />

      {/* Logout */}

      <TouchableOpacity
        style={styles.logout}
        onPress={logout}>
        <Icon
          name="log-out-outline"
          size={24}
          color="red"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',

    paddingVertical: 30,

    backgroundColor: '#007AFF',

    borderBottomLeftRadius: 25,

    borderBottomRightRadius: 25,
  },

  image: {
    width: 90,

    height: 90,

    borderRadius: 45,

    borderWidth: 3,

    borderColor: '#fff',
  },

  name: {
    marginTop: 15,

    fontSize: 20,

    fontWeight: '700',

    color: '#fff',
  },

  email: {
    marginTop: 5,

    color: '#EAF3FF',

    fontSize: 14,
  },

  menu: {
    marginTop: 25,
  },

  item: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 20,

    paddingVertical: 16,
  },

  itemText: {
    marginLeft: 18,

    fontSize: 16,

    fontWeight: '600',

    color: '#222',
  },

  logout: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 20,

    paddingVertical: 22,

    borderTopWidth: 1,

    borderColor: '#EEE',
  },

  logoutText: {
    marginLeft: 18,

    fontSize: 17,

    fontWeight: '700',

    color: 'red',
  },
});