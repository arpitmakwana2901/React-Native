import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = ({ navigation }) => {
  const [email, setEmail] = useState('');
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
        const user = JSON.parse(data);

        setEmail(user.email);

        const image =
          await AsyncStorage.getItem(
            `PROFILE_IMAGE_${user.email}`,
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
    await AsyncStorage.removeItem('USER_DATA');

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };

  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ],
    );
  };

  const DrawerItem = (
    icon,
    title,
    screen,
  ) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.closeDrawer();

        navigation.navigate('Dashboard', {
          screen,
        });
      }}>
      <Icon
        name={icon}
        size={23}
        color="#007AFF"
      />

      <Text style={styles.itemText}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}>

      <View style={styles.header}>

        <Image
          source={
            profileImage
              ? {
                  uri: profileImage,
                }
              : require('../assets/images/profile.png')
          }
          style={styles.image}
        />

        <Text style={styles.name}>
          {email
            ? email.split('@')[0]
            : 'User'}
        </Text>

        <Text style={styles.email}>
          {email}
        </Text>

      </View>

      <View style={styles.menu}>

        {DrawerItem(
          'home-outline',
          'Home',
          'Home',
        )}

        {DrawerItem(
          'people-outline',
          'Users',
          'Users',
        )}

        {DrawerItem(
          'add-circle-outline',
          'Add',
          'Add',
        )}

        {DrawerItem(
          'person-outline',
          'Profile',
          'Profile',
        )}

      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={confirmLogout}>

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

export default CustomDrawerContent;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 35,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  image: {
    width: 95,
    height: 95,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#fff',
  },

  name: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  email: {
    marginTop: 5,
    fontSize: 14,
    color: '#E9F3FF',
  },

  menu: {
    marginTop: 25,
    paddingHorizontal: 15,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  itemText: {
    fontSize: 17,
    marginLeft: 18,
    fontWeight: '600',
    color: '#222',
  },

  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    paddingTop: 20,
  },

  logoutText: {
    fontSize: 17,
    marginLeft: 18,
    color: 'red',
    fontWeight: '700',
  },
});