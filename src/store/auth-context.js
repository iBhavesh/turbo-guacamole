import {createContext} from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  signin: async () => {},
  signout: () => {},
  loading: false,
  error: '',
});

export default AuthContext;
