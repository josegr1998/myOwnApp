import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "../reducers/PostReducer";
import { useUserContext } from "./UserContext";
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
} from "../constants";

export const url = "https://my-memories-project-portfolio.herokuapp.com";
// export const url = "http://localhost:5000";

const PostContext = React.createContext();

const initialState = {
  isLoading: false,
  posts: [],
  isSidebarOpen: false,
  editID: false,
  postData: {
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  },
  pageNumber: 1,
  postPerPage: 3,
  allPosts: [],
  isPosting: false,
  isDelete: false,
  isUpdating: false,
};

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useUserContext();
  let token;

  if (user) {
    token = user.token;
  } else {
    token = null;
  }

  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };

  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };

  const updatePostData = (name, value) => {
    // console.log(name, value);
    if (name === "tags") {
      value = value.split(",");
    }
    dispatch({ type: UPDATE_POST_DATA, payload: { name, value } });
  };

  const updateImage = (value) => {
    console.log(value);
    dispatch({ type: UPDATE_IMAGE, payload: value });
  };

  //get all posts

  //create post
  const createPost = async () => {
    if (token) {
      try {
        const reqBody = { ...state.postData, name: user.result.name };
        const { data } = await axios.post(`${url}/posts`, reqBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: CREATE_POST, payload: data.newPost });
        getAllPosts("create");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //update post
  const updateEditID = (id) => {
    dispatch({ type: UPDATE_EDIT_ID, payload: id });
    dispatch({ type: OPEN_SIDEBAR });
  };

  const clearPostData = () => {
    dispatch({ type: CLEAR_POST_DATA });
  };

  const updatePost = async (id, postData) => {
    try {
      const { data } = await axios.patch(`${url}/posts/${id}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: UPDATE_POST, payload: data.updatedPost });
      getAllPosts("update");
    } catch (error) {
      console.log(error);
    }
  };
  //delete post

  const deletePost = async (id) => {
    if (token) {
      const { data } = await axios.delete(`${url}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: DELETE_POST, payload: data.deletedPost });
      getAllPosts("delete");
    }
  };

  //like post

  const likePost = async (id) => {
    if (token) {
      try {
        const { data } = await axios.patch(`${url}/posts/${id}/likePost`, id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({ type: LIKE_POST, payload: data.newPost });
        getAllPosts("like");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //pagination
  const updatePageNumber = (move) => {
    dispatch({ type: UPDATE_PAGE_NUMBER, payload: move });
  };
  const updatePageNumberBtn = (index) => {
    dispatch({ type: UPDATE_PAGE_NUMBER_BTN, payload: index });
  };

  const getAllPosts = async (type) => {
    dispatch({ type: START_LOADING, payload: type });
    const { data } = await axios.get(`${url}/posts`);

    dispatch({ type: GET_ALL_POSTS_COMPLETE, payload: data.allPosts });
  };

  useEffect(() => {
    getAllPosts("loading");
  }, []);

  return (
    <PostContext.Provider
      value={{
        ...state,
        updatePostData,
        updateImage,
        openSidebar,
        closeSidebar,
        createPost,
        updateEditID,
        updatePost,
        clearPostData,
        deletePost,
        likePost,
        updatePageNumber,
        updatePageNumberBtn,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };
