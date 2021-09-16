import axios from 'axios';
import React, {useState} from 'react';
import AuthContext from './auth-context';
import * as Keychain from 'react-native-keychain';

const url = 'https://qaazii.com/dev/public/api/sign-in';

const CartProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const singin = async (phone, password) => {
    setLoading(true);
    try {
      const response = await axios.post(url, {
        phone: phone,
        country_code: '+91',
        password: password,
        user_type: 'V',
        login_type: 'I',
      });
      setLoading(false);
      if (response.status !== 200) {
        return setError('Username/password invalid');
      }
      await Keychain.setGenericPassword('isLoggedIn', 'true');
      return setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
      setError('Username/password invalid');
      setLoading(false);
    }
  };
  const signout = () => {
    Keychain.resetGenericPassword();
    setIsLoggedIn(false);
  };
  const register = () => {
    setIsLoggedIn(true);
  };
  const setLogin = value => {
    setIsLoggedIn(value);
  };

  const authContextHelper = {
    isLoggedIn: isLoggedIn,
    signin: singin,
    register: register,
    signout: signout,
    setLogin: setLogin,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={authContextHelper}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default CartProvider;
