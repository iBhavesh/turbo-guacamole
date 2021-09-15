/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import FormField from '../components/FormField';

import RegisterHeader from '../components/RegisterHeader';
import colors from '../constants/colors';

import AuthContext from '../store/auth-context';

const RegistrationScreen = ({navigation}) => {
  const goToRegister = () => {
    navigation.goBack();
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
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  return (
    <>
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
        title="Sign in"
        buttonStyle={styles.buttonStyle}
        onPress={authCtx.login}
        disabled={!emailIsValid || !passwordIsValid}
      />
    </>
  );
};

export default RegistrationScreen;
