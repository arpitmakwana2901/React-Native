import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <Text style={styles.text}>
        or continue with
      </Text>

      <View style={styles.line} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: 25,
  },

  line: {
    flex: 1,

    height: 1,

    backgroundColor: '#E5E5E5',
  },

  text: {
    marginHorizontal: 12,

    color: '#777',

    fontSize: 14,
  },
});