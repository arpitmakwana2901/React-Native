import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyState = ({message = 'No data found'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  text: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default EmptyState;