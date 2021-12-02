import {
  AUTH,
  UPDATE_USER_INFO,
  LOGOUT,
  INVALID_CREDENTIALS,
  SET_ERROR_FALSE,
} from "../constants";

const reducer = (state, action) => {
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

export default reducer;
