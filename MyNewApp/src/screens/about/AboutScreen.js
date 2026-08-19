import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Social Feed & Community
      </Text>

      <Text>Version 1.0.0</Text>

      <Text style={styles.description}>
        A React Native social community application
        built using React Native, Redux Toolkit,
        fake REST APIs and Firebase Authentication.
      </Text>

      <Text style={styles.developer}>
        Developed by Arpit
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },

  description: {
    marginTop: 20,
    lineHeight: 24,
    color: '#6B7280',
  },

  developer: {
    marginTop: 30,
    fontWeight: '600',
  },
});

export default AboutScreen;