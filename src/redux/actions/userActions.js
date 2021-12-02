import axios from "axios";
import url from "./postsActions";
import {
  AUTH,
  UPDATE_USER_INFO,
  LOGOUT,
  INVALID_CREDENTIALS,
  SET_ERROR_FALSE,
} from "../../constants";

export const loginWithGoogle = (result, token) => {
  return {
    type: AUTH,
    payload: { result, token },
  };
};

export const updateUserInfo = (name, value) => {
  return {
    type: UPDATE_USER_INFO,
    payload: { name, value },
  };
};

export const signIn = (userInfo) => async (dispatch) => {
  const response = await axios.post(`${url}/users/singup`, userInfo);
  dispatch({
    type: AUTH,
    payload: response.data,
  });
};

export const login = (userInfo) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/users/login`, userInfo);
    dispatch({
      type: AUTH,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: INVALID_CREDENTIALS });
  }
};

export const setErrorFalse = () => async (dispatch) => {
  dispatch({ type: SET_ERROR_FALSE });
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
