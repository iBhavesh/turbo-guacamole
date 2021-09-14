import {createContext} from 'react';

type AuthContextInterface = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextInterface | null>(null);

export default AuthContext;
