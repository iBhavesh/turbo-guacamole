import React from 'react';
import {Input} from 'react-native-elements';

const TextInput = ({style, label, placeholder, ...props}) => {
  return <Input label={label} placeholder={placeholder} {...props} />;
};

export default TextInput;
