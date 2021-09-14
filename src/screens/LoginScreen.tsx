import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import Card from '../components/Card';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import TextButton from '../components/TextButton';
import {RootStackParamList} from '../navigator/AuthNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AuthContext from '../store/auth-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const RegistrationScreen = ({navigation}: Props) => {
  const authCtx = useContext(AuthContext);

  const goToRegister = () => {
    navigation.replace('Register');
  };
  return (
    <View style={styles.container}>
      <Card>
        <TextInput placeholder="Email" placeholderTextColor="black" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={authCtx!.login} />
        </View>
        <View style={styles.buttonContainer}>
          <TextButton title="Register instead" onPress={goToRegister} />
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
