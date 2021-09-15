import React, {useEffect, useState} from 'react';
import TextInput from '../components/TextInput';

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTouched, setisTouched] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line curly
    if (!isTouched) return;
    if (value.length === 0) {
      return setErrorMessage(`${label} is required`);
    }
    if (value.length < validLength) {
      return setErrorMessage(
        `${label} must be atleast ${validLength} characters`,
      );
    }
    if (isEmail && !validateEmail(value)) {
      return setErrorMessage('Email is not valid');
    }
    setErrorMessage('');
    isValid(true);
  }, [isTouched, value, setErrorMessage, label, validLength, isEmail, isValid]);

  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      leftIcon={leftIcon}
      errorMessage={errorMessage}
      value={value}
      onBlur={() => setisTouched(true)}
      onChangeText={text => {
        setValue(text);
      }}
      {...props}
    />
  );
};

export default FormField;
