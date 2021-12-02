import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  UPDATE_POST_DATA,
  UPDATE_IMAGE,
  CREATE_POST,
  CLEAR_POST_DATA,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  START_LOADING,
  UPDATE_EDIT_ID,
  GET_ALL_POSTS_COMPLETE,
  UPDATE_PAGE_NUMBER,
  UPDATE_PAGE_NUMBER_BTN,
} from "../../constants";
import axios from "axios";
const url = "https://my-memories-project-portfolio.herokuapp.com";
// const url = "http://localhost:5000";

export const startLoading = (type) => {
  return {
    type: START_LOADING,
    payload: type,
  };
};

export const openSidebar = () => {
  return {
    type: OPEN_SIDEBAR,
  };
};

export const closeSidebar = () => {
  return {
    type: CLOSE_SIDEBAR,
  };
};

export const updatePostData = (name, value) => {
  if (name === "tags") {
    value = value.split(".");
  }
  return {
    type: UPDATE_POST_DATA,
    payload: { name, value },
  };
};

export const updateImage = (value) => {
  return {
    type: UPDATE_IMAGE,
    payload: value,
  };
};

export const createPost = (user, postData) => async (dispatch) => {
  let token;

  if (user) {
    token = user.token;
  } else {
    token = null;
  }

  if (token) {
    try {
      const reqBody = { ...postData, name: user.result.name };
      const { data } = await axios.post(`${url}/posts`, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: CREATE_POST,
        payload: data.newPost,
      });
      dispatch(getAllPosts("create")); //always use even inside this file
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateEditID = (id) => {
  console.log(id);

  return {
    type: UPDATE_EDIT_ID,
    payload: id,
  };
};

export const clearPostData = () => {
  return {
    type: CLEAR_POST_DATA,
  };
};

export const updatePost = (id, postData, user) => async (dispatch) => {
  let token;
  if (user) {
    token = user.token;
  } else {
    token = null;
  }

  try {
    const { data } = await axios.patch(`${url}/posts/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: UPDATE_POST, payload: data.updatedPost });
    dispatch(getAllPosts("update"));
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, user) => async (dispatch) => {
  let token;
  if (user) {
    token = user.token;
  } else {
    token = null;
  }

  if (token) {
    const { data } = await axios.delete(`${url}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DELETE_POST, payload: data.deletedPost });
    dispatch(getAllPosts("delete"));
  }
};

export const likePost = (user, id) => async (dispatch) => {
  let token;
  if (user) {
    token = user.token;
  } else {
    token = null;
  }
  if (token) {
    try {
      const { data } = await axios.patch(`${url}/posts/${id}/likePost`, id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: LIKE_POST, payload: data.newPost });
      dispatch(getAllPosts("like"));
    } catch (error) {
      console.log(error);
    }
  }
};

export const updatePageNumber = (move) => {
  return {
    type: UPDATE_PAGE_NUMBER,
    payload: move,
  };
};

export const updatePageNumberBtn = (index) => {
  return {
    type: UPDATE_PAGE_NUMBER_BTN,
    payload: index,
  };
};

export const getAllPosts = (type) => async (dispatch) => {
  dispatch(startLoading(type));
  const { data } = await axios.get(`${url}/posts`);

  dispatch({ type: GET_ALL_POSTS_COMPLETE, payload: data.allPosts });
};

export default url;
