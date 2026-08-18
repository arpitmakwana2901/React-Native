import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Images from '../constants/Images';
import Colors from '../constants/Color';

const ProfileHeader = ({
  image,
  email,
  onChangePhoto,
}) => {
  const username = email
    ? email.split('@')[0]
    : 'Guest';

  return (
    <View style={styles.container}>

      {/* Profile Image */}

      <View style={styles.imageContainer}>
        <Image
          source={
            image
              ? { uri: image }
              : Images.profile
          }
          style={styles.image}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cameraButton}
          onPress={onChangePhoto}
        >
          <Text style={styles.cameraIcon}>
            📷
          </Text>
        </TouchableOpacity>
      </View>

      {/* Change Photo */}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.changeButton}
        onPress={onChangePhoto}
      >
        <Text style={styles.changeText}>
          Change Photo
        </Text>
      </TouchableOpacity>

      {/* Name */}

      <Text style={styles.name}>
        {username}
      </Text>

      {/* Email */}

      <Text style={styles.email}>
        {email}
      </Text>

      {/* Bio */}

      <Text style={styles.bio}>
        Welcome to your profile.
        Manage your account, update your
        profile photo and settings.
      </Text>

    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,

    marginHorizontal: 16,

    marginTop: 18,

    borderRadius: 25,

    paddingVertical: 28,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,

    borderWidth: 4,
    borderColor: '#007AFF',

    backgroundColor: '#ECECEC',
  },

  cameraButton: {
    position: 'absolute',

    bottom: 2,

    right: 2,

    width: 36,

    height: 36,

    borderRadius: 18,

    backgroundColor: '#007AFF',

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 4,
  },

  cameraIcon: {
    fontSize: 17,
    color: '#fff',
  },

  changeButton: {
    marginTop: 18,

    paddingHorizontal: 22,

    paddingVertical: 10,

    backgroundColor: '#007AFF',

    borderRadius: 25,
  },

  changeText: {
    color: '#fff',

    fontSize: 15,

    fontWeight: '700',
  },

  name: {
    marginTop: 20,

    fontSize: 23,

    fontWeight: '700',

    color: '#222',
  },

  email: {
    marginTop: 6,

    fontSize: 15,

    color: '#666',
  },

  bio: {
    marginTop: 15,

    width: '85%',

    textAlign: 'center',

    fontSize: 14,

    lineHeight: 22,

    color: '#777',
  },
});