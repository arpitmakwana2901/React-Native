import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
 Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import ProfileHeader from '../components/ProfileHeader';
import MenuItem from '../components/MenuItem';
import LogoutButton from '../components/LogoutButton';

import styles from '../styles/ProfileStyle';

const ProfileScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);

  const [email, setEmail] = useState('');

  const [profileImage, setProfileImage] = useState(null);

  const [bottomSheet, setBottomSheet] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem('USER_DATA');

      if (data) {
        const user = JSON.parse(data);

        setEmail(user.email);

        const image = await AsyncStorage.getItem(
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

  const saveImage = async uri => {
    try {
      await AsyncStorage.setItem(
        `PROFILE_IMAGE_${email}`,
        uri,
      );

      setProfileImage(uri);

      setBottomSheet(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert('Camera Error', response.errorMessage);
          return;
        }

        if (response.assets?.length > 0) {
          saveImage(response.assets[0].uri);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert('Gallery Error', response.errorMessage);
          return;
        }

        if (response.assets?.length > 0) {
          saveImage(response.assets[0].uri);
        }
      },
    );
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('USER_DATA');

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <ProfileHeader
          image={profileImage}
          email={email}
          onChangePhoto={() => setBottomSheet(true)}
        />

        <View style={styles.menuContainer}>

          <MenuItem
            icon="mail-outline"
            title={email}
            onPress={() => {}}
          />

          <MenuItem
            icon="person-circle-outline"
            title="Account Information"
            onPress={() => {}}
          />

          <MenuItem
            icon="moon-outline"
            title="Dark Mode"
            showSwitch
            switchValue={darkMode}
            onToggle={() => setDarkMode(!darkMode)}
          />

          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            onPress={() => {}}
          />

          <MenuItem
            icon="lock-closed-outline"
            title="Privacy"
            onPress={() => {}}
          />

        </View>

        <LogoutButton onPress={handleLogout} />

      </ScrollView>

      {/* Bottom Sheet */}

      <Modal
        visible={bottomSheet}
        transparent
        animationType="slide">

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setBottomSheet(false)}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 22,
            }}>

            <View
              style={{
                width: 60,
                height: 5,
                backgroundColor: '#D9D9D9',
                borderRadius: 5,
                alignSelf: 'center',
                marginBottom: 22,
              }}
            />

            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: 25,
              }}>
              Change Profile Photo
            </Text>

            <TouchableOpacity
              onPress={openCamera}
              style={{
                paddingVertical: 18,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#007AFF',
                  textAlign: 'center',
                }}>
                📷 Take Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openGallery}
              style={{
                paddingVertical: 18,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#007AFF',
                  textAlign: 'center',
                }}>
                🖼 Choose From Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setBottomSheet(false)}
              style={{
                paddingVertical: 18,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: 'red',
                  textAlign: 'center',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>

          </TouchableOpacity>

        </TouchableOpacity>

      </Modal>

    </SafeAreaView>
  );
};

export default ProfileScreen;