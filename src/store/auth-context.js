import {createContext} from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  signin: async () => {},
  signout: () => {},
  register: () => {},
  loading: false,
  error: '',
});

export default AuthContext;
