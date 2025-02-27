import { createContext, useState, useContext } from "react";
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
