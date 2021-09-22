/* eslint-disable react-native/no-inline-styles */
import React, {useReducer} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';

import FormField from '../components/FormField';
import RegisterHeader from '../components/RegisterHeader';
import colors from '../constants/colors';
import {login} from '../store/reducers/authSlice';

const SigninScreen = ({navigation}) => {
  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <RegisterHeader title="Welcome" subtitle="Sign in to continue" />
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.body}>
            <View>
              <Form />
              <View style={styles.footerStyle}>
                <Text>Don't have an account?</Text>
                <Button
                  type="clear"
                  title="Sign up"
                  titleStyle={{color: colors.secondary}}
                  onPress={goToRegister}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    borderRadius: 40,
    backgroundColor: colors.secondaryLight,
  },
  clearButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorStyle: {
    color: 'red',
    fontSize: 18,
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  textInput: {
    width: 105,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const initialState = {
  country: {
    callingCode: ['91'],
    countryCode: 'IN',
  },
  phone: {
    isTouched: false,
    isValid: true,
    error: 'Phone No. is required',
    value: '9836222684',
  },
  password: {
    isTouched: false,
    isValid: true,
    error: 'Password is Requried',
    value: '123456',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'phone':
      return {
        phone: {
          ...state.phone,
          isValid: action.payload.isValid,
          error: action.payload.error,
          value: action.payload.value,
        },
        password: state.password,
        country: state.country,
      };
    case 'password':
      return {
        phone: state.phone,
        password: {
          ...state.password,
          isValid: action.payload.isValid,
          error: action.payload.error,
          value: action.payload.value,
        },
        country: state.country,
      };
    case 'country':
      return {
        phone: state.phone,
        password: state.password,
        country: {
          countryCode: action.payload.cca2,
          callingCode: action.payload.callingCode,
        },
      };
    case 'phoneBlur':
      return {
        phone: {...state.phone, isTouched: true},
        password: {...state.password},
        country: {...state.country},
      };
    case 'passwordBlur':
      return {
        phone: {...state.phone},
        password: {...state.password, isTouched: true},
        country: {...state.country},
      };
    default:
      break;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const phoneChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'phone is required';
    }
    if (value.length < 10) {
      isValid = false;
      error = 'phone is not valid';
    }
    dispatch({type: 'phone', payload: {value, isValid, error}});
  };
  const passwordChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Password is required';
    }
    if (value.length < 5) {
      isValid = false;
      error = 'Password should be atleaset 5 characters';
    }
    dispatch({type: 'password', payload: {value, isValid, error}});
  };

  const phoneBlurHandler = value => {
    if (state.phone.isTouched) {
      return;
    }
    dispatch({type: 'phoneBlur'});
  };
  const passwordBlurHandler = value => {
    if (state.password.isTouched) {
      return;
    }
    dispatch({type: 'passwordBlur'});
  };

  const isValid = state.phone.isValid && state.password.isValid;

  const reduxDispatch = useDispatch();
  const reduxState = useSelector(rxState => rxState.auth);

  const submitHandler = async () => {
    reduxDispatch(
      login({
        phone: +state.phone.value,
        password: state.password.value,
        callingCode: state.country.callingCode,
      }),
    );
  };

  return (
    <>
      <FormField
        placeholder="phone"
        label="Phone"
        returnKeyType="next"
        leftIcon={
          <CountryPicker
            withFilter
            withAlphaFilter
            countryCode={state.country.countryCode}
            onSelect={country => dispatch({type: 'country', payload: country})}
          />
        }
        onChangeText={phoneChangeHandler}
        onBlur={phoneBlurHandler}
        value={state.phone.value}
        keyboardType="numeric"
        errorMessage={state.phone.isTouched ? state.phone.error : ''}
      />
      <FormField
        placeholder="Password"
        label="Password"
        leftIcon={{type: 'ionicon', name: 'ios-lock-closed'}}
        onChangeText={passwordChangeHandler}
        secureTextEntry
        onBlur={passwordBlurHandler}
        value={state.password.value}
        errorMessage={state.password.isTouched ? state.password.error : ''}
      />
      <View style={styles.clearButtonContainer}>
        <Button
          type="clear"
          title="Forget Password?"
          titleStyle={{color: colors.secondary}}
          onPress={() => {}}
        />
      </View>
      {reduxState.error.length > 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorStyle}>{reduxState.error}</Text>
        </View>
      )}

      {reduxState.isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button
          containerStyle={styles.buttonContainer}
          title="Sign in"
          buttonStyle={styles.buttonStyle}
          onPress={submitHandler}
          disabled={!isValid}
        />
      )}
    </>
  );
};

export default SigninScreen;
