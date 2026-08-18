import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ProfileHeader from '../../components/ProfileHeader';
import Button from '../../components/Button';

const ProfileScreen = () => {
  const user = {
    name: 'Demo User',
    email: 'demo@example.com',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader user={user} />

      <View style={styles.stats}>
        <View>
          <Text style={styles.number}>24</Text>
          <Text>Posts</Text>
        </View>

        <View>
          <Text style={styles.number}>120</Text>
          <Text>Followers</Text>
        </View>

        <View>
          <Text style={styles.number}>85</Text>
          <Text>Following</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Edit Profile"
          onPress={() => {}}
        />

        <View style={{height: 10}} />

        <Button
          title="Logout"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },

  number: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

  buttons: {
    padding: 20,
  },
});

export default ProfileScreen;