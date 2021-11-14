import React, { useContext, useReducer } from "react";
import reducer from "../reducers/UserReducer";
import axios from "axios";
import { url } from "./PostContext";

const UserContext = React.createContext();

const getUser = () => {
  let user = JSON.parse(localStorage.getItem("profile"));
  if (user) {
    return user;
  } else {
    return null;
  }
};

const initialState = {
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  user: getUser(),
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginWithGoogle = (result, token) => {
    console.log(result, token);
    dispatch({ type: "AUTH", payload: { result, token } });
  };

  const updateUserInfo = (name, value) => {
    dispatch({ type: "UPDATE_USER_INFO", payload: { name, value } });
  };

  const signIn = async () => {
    console.log(`im going here`);
    const response = await axios.post(`${url}/users/singup`, state.userInfo);
    dispatch({ type: "AUTH", payload: response.data });
  };

  const login = async () => {
    const response = await axios.post(`${url}/users/login`, state.userInfo);
    dispatch({ type: "AUTH", payload: response.data });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        updateUserInfo,
        loginWithGoogle,
        logout,
        signIn,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
