import React, {useState} from 'react';
import AuthContext from './auth-context';

const CartProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const singin = async (mobile, password) => {
    setLoading(true);
    setTimeout(() => {
      // setIsLoggedIn(true);
      setError('Error is there');
      setLoading(false);
    }, 2000);
  };
  const signout = () => {
    setIsLoggedIn(false);
  };

  const authContextHelper = {
    isLoggedIn: isLoggedIn,
    signin: singin,
    signout: signout,
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
