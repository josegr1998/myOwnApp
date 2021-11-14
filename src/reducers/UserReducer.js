const reducer = (state, action) => {
  if (action.type === "UPDATE_USER_INFO") {
    const { name, value } = action.payload;

    return { ...state, userInfo: { ...state.userInfo, [name]: value } };
  }
  if (action.type === "AUTH") {
    localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

    return { ...state, user: { ...action.payload } };
  }
  if (action.type === "LOGOUT") {
    localStorage.clear();
    return { ...state, user: null };
  }
  return state;
};

export default reducer;
