import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Add Screen
      </Text>

      <Text style={styles.subtitle}>
        Coming Soon...
      </Text>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
  },
});