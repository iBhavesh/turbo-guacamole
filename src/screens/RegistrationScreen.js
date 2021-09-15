/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';

import RegisterHeader from '../components/RegisterHeader';
import FormField from '../components/FormField';
import colors from '../constants/colors';

import AuthContext from '../store/auth-context';
import {ScrollView} from 'react-native-gesture-handler';

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

const Form = ({isValid}) => {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [fnIsValid, setFnIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  return (
    <>
      <FormField
        placeholder="Full Name"
        label="Full Name"
        leftIcon={{type: 'ionicon', name: 'ios-person'}}
        isValid={value => setFnIsValid(value)}
      />
      <FormField
        placeholder="Email"
        label="Email"
        leftIcon={{type: 'ionicon', name: 'mail'}}
        isEmail={true}
        isValid={value => setEmailIsValid(value)}
      />
      <FormField
        placeholder="Password"
        label="Password"
        leftIcon={{type: 'ionicon', name: 'ios-lock-closed'}}
        isValid={value => setPasswordIsValid(value)}
        secureTextEntry
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
        disabled={!fnIsValid || !emailIsValid || !passwordIsValid}
      />
    </>
  );
};

export default RegistrationScreen;
