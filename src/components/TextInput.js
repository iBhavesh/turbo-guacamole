import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

const TextInput = ({
  style,
  label,
  labelStyle,
  inputContainerStyle,
  placeholder,
  leftIcon,
  ...props
}) => {
  return (
    <Input
      label={label}
      labelStyle={styles.labelStyle}
      inputContainerStyle={styles.inputContainerStyle}
      placeholder={placeholder}
      leftIcon={leftIcon}
      {...props}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 10,
  },
  labelStyle: {
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
    fontWeight: '900',
    color: '#606060',
  },
});
