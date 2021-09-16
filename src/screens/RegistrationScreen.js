/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useReducer} from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

import RegisterHeader from '../components/RegisterHeader';
import FormField from '../components/FormField';
import colors from '../constants/colors';
import AuthContext from '../store/auth-context';
import {validateEmail} from '../helpers/helpers';

const RegistrationScreen = ({navigation}) => {
  const goToLogin = () => {
    navigation.push('Login');
  };

  return (
    <View style={styles.container}>
      <RegisterHeader
        title="Welcome"
        subtitle="Create an account to continue"
      />
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.body}>
            <View>
              <Form />

              <View style={styles.footerStyle}>
                <Text>Already Have an account?</Text>
                <Button
                  type="clear"
                  title="Sign in"
                  titleStyle={{color: colors.secondary}}
                  onPress={goToLogin}
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
    // alignItems: 'center',
    padding: 10,
    paddingTop: 0,
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
  email: {isTouched: false, isValid: false, error: 'Email is required'},
  fullName: {isTouched: false, isValid: false, error: 'Full Name is required'},
  password: {isTouched: false, isValid: false, error: 'Password is Requried'},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return {
        email: {
          ...state.email,
          isValid: action.payload.isValid,
          error: action.payload.error,
        },
        password: state.password,
        fullName: state.fullName,
      };
    case 'password':
      return {
        email: state.email,
        password: {
          ...state.password,
          isValid: action.payload.isValid,
          error: action.payload.error,
        },
        fullName: state.fullName,
      };
    case 'fullName':
      return {
        email: state.email,
        password: state.password,
        fullName: {
          ...state.fullName,
          isValid: action.payload.isValid,
          error: action.payload.error,
        },
      };
    case 'emailBlur':
      return {
        email: {...state.email, isTouched: true},
        password: {...state.password},
        fullName: {...state.fullName},
      };
    case 'passwordBlur':
      return {
        email: {...state.email},
        password: {...state.password, isTouched: true},
        fullName: {...state.fullName},
      };
    case 'fullNameBlur':
      return {
        email: {...state.email},
        password: {...state.password},
        fullName: {...state.fullName, isTouched: true},
      };
    default:
      break;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const emailChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Email is required';
    }
    if (!validateEmail(value)) {
      isValid = false;
      error = 'Email is not valid';
    }
    dispatch({type: 'email', payload: {value, isValid, error}});
  };
  const fullNameChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Full Name is required';
    }
    if (value.length < 2) {
      isValid = false;
      error = 'Full Name should be atleaset 2 characters';
    }
    dispatch({type: 'fullName', payload: {value, isValid, error}});
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

  const emailBlurHandler = value => {
    if (state.email.isTouched) {
      return;
    }
    dispatch({type: 'emailBlur'});
  };
  const passwordBlurHandler = value => {
    if (state.password.isTouched) {
      return;
    }
    dispatch({type: 'passwordBlur'});
  };
  const fullNameBlurHandler = value => {
    if (state.fullName.isTouched) {
      return;
    }
    dispatch({type: 'fullNameBlur'});
  };

  const isValid =
    state.email.isValid && state.fullName.isValid && state.password.isValid;

  const authCtx = useContext(AuthContext);

  return (
    <>
      <FormField
        placeholder="Full Name"
        label="Full Name"
        returnKeyType="next"
        leftIcon={{type: 'ionicon', name: 'ios-person'}}
        onChangeText={fullNameChangeHandler}
        onBlur={fullNameBlurHandler}
        value={state.fullName.value}
        errorMessage={state.fullName.isTouched ? state.fullName.error : ''}
      />
      <FormField
        placeholder="Email"
        label="Email"
        returnKeyType="next"
        leftIcon={{type: 'ionicon', name: 'mail'}}
        onChangeText={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={state.email.value}
        errorMessage={state.email.isTouched ? state.email.error : ''}
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
      <Button
        containerStyle={styles.buttonContainer}
        title="Register"
        buttonStyle={styles.buttonStyle}
        onPress={authCtx.login}
        disabled={!isValid}
      />
    </>
  );
};

export default RegistrationScreen;
