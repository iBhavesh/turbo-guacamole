import React from 'react';
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
      placeholder={placeholder}
      label={label}
      leftIcon={leftIcon}
      {...props}
    />
  );
};

export default FormField;
