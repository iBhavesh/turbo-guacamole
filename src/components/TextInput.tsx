import React from 'react';
import {StyleSheet, TextInput as TI, TextInputProps} from 'react-native';

interface Props extends TextInputProps {}

const TextInput = ({style, ...props}: Props) => {
  return (
    <>
      <TI
        style={[styles.textInput, style]}
        placeholder="Email"
        placeholderTextColor="#292929"
        {...props}
      />
    </>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    color: '#292929',
    borderColor: '#857474',
    width: 220,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
});
