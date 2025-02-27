import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null; // Recuperar sesión previa
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId); // Guardar sesión
    } else {
      localStorage.removeItem("userId"); // Borrar si no hay usuario
    }
  }, [userId]);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthProvider.defaultProps = {
  children: null,
};