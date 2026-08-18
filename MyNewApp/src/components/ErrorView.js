import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ErrorView = ({message = 'Something went wrong', onRetry}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{message}</Text>

      {onRetry && (
        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      )}
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

  error: {
    fontSize: 16,
    marginBottom: 15,
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4F46E5',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ErrorView;