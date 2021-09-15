import React, {useState} from 'react';
import AuthContext from './auth-context';

const CartProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  const authContextHelper = {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authContextHelper}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default CartProvider;
