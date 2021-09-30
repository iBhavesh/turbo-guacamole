import React from 'react';
import {StyleSheet} from 'react-native';
import TextInput from '../components/TextInput';

const FormField = ({
  placeholder,
  label,
  leftIcon,
  validLength = 1,
  required = true,
  isEmail,
  isValid,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      labelStyle={styles.labelStyle}
      inputContainerStyle={styles.inputContainerStyle}
      placeholder={placeholder}
      label={label}
      leftIcon={leftIcon}
    />
  );
};

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

export default FormField;
