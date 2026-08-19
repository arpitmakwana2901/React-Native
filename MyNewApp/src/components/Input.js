import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = ({
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      keyboardType={keyboardType}
      style={[
        styles.input,
        multiline && styles.multiline,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  multiline: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default Input;