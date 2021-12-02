import {
  AUTH,
  UPDATE_USER_INFO,
  LOGOUT,
  INVALID_CREDENTIALS,
  SET_ERROR_FALSE,
} from "../../constants";

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
  invalidCredentials: null,
  user: getUser(),
};

export const UserReducer = (state = initialState, action) => {
  if (action.type === UPDATE_USER_INFO) {
    const { name, value } = action.payload;
    return { ...state, userInfo: { ...state.userInfo, [name]: value } };
  }
  if (action.type === AUTH) {
    localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

    return { ...state, user: { ...action.payload }, invalidCredentials: false };
  }

  if (action.type === LOGOUT) {
    localStorage.clear();
    return { ...state, user: null };
  }
  if (action.type === INVALID_CREDENTIALS) {
    return { ...state, invalidCredentials: true };
  }
  if (action.type === SET_ERROR_FALSE) {
    return { ...state, invalidCredentials: null };
  }
  return state;
};
