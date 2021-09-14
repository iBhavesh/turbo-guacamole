import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import Card from '../components/Card';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import TextButton from '../components/TextButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigator/AuthNavigator';
import AuthContext from '../store/auth-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegistrationScreen = ({navigation}: Props) => {
  const goToLogin = () => {
    navigation.push('Login');
  };
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.row}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="black"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Second Name"
            placeholderTextColor="black"
            style={styles.textInput}
          />
        </View>
        <TextInput placeholder="Email" placeholderTextColor="black" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="black"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={authCtx!.login} />
        </View>
        <View style={styles.buttonContainer}>
          <TextButton title="Login instead" onPress={goToLogin} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    width: 105,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RegistrationScreen;
