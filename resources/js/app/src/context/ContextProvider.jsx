import { createContext, useContext, useState } from "react";

export const LoginContexto = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('TOKEN'));

 const _setToken = (token) => {
  setToken(token);

  if (token) {
    localStorage.setItem('TOKEN', token);  
  } else {
    localStorage.removeItem('TOKEN'); 
  }
};

  const _setUser = (user) => {
    setUser(user);
    localStorage.setItem('USER', user.name); 
  };

  return (
    <LoginContexto.Provider value={{ _setToken, _setUser }}>
      {children}
    </LoginContexto.Provider>
  );
};

export default ContextProvider;

export const useLogin = () => {
  const contexto = useContext(LoginContexto);
  return contexto;
};