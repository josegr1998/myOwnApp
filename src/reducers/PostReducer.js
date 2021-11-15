import React from "react";
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
} from "../constants";

const reducer = (state, action) => {
  if (action.type === UPDATE_POST_DATA) {
    const { name, value } = action.payload;
    return { ...state, postData: { ...state.postData, [name]: value } };
  }
  if (action.type === UPDATE_IMAGE) {
    return {
      ...state,
      postData: { ...state.postData, selectedFile: action.payload },
    };
  }
  if (action.type === OPEN_SIDEBAR) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === CREATE_POST) {
    console.log(action.payload);
    return {
      ...state,
      posts: [action.payload, ...state.posts],
      postData: {
        creator: "",
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
      },
      isPosting: true,
    };
  }

  if (action.type === START_LOADING) {
    if (action.payload === "loading") {
      return { ...state, isLoading: true };
    }
    if (action.payload === "create") {
      return { ...state, isPosting: true };
    }
    if (action.payload === "delete") {
      return { ...state, isDelete: true };
    }
    if (action.payload === "update") {
      return { ...state, isUpdating: true };
    }
    if (action.payload === "like") {
      return { ...state };
    }
  }

  if (action.type === GET_ALL_POSTS_COMPLETE) {
    const skip = (state.pageNumber - 1) * state.postPerPage;

    const pagePosts = action.payload.slice(skip, skip + state.postPerPage);

    return {
      ...state,
      allPosts: action.payload,
      posts: pagePosts,
      isLoading: false,
      isPosting: false,
      isDelete: false,
      isUpdating: false,
    };
  }
  if (action.type === UPDATE_EDIT_ID) {
    const editPost = state.posts.find((item) => {
      if (item._id === action.payload) {
        return item;
      }
    });
    console.log(editPost);

    return {
      ...state,
      editID: action.payload,
      postData: {
        ...state.postData,
        creator: editPost.creator,
        message: editPost.message,
        selectedFile: editPost.selectedFile,
        tags: editPost.tags,
        title: editPost.title,
      },
    };
  }

  if (action.type === UPDATE_POST) {
    const newPosts = state.posts.map((item) => {
      if (item._id === action.payload._id) {
        return action.payload;
      } else {
        return item;
      }
    });

    return { ...state, posts: newPosts, editID: false };
  }
  if (action.type === CLEAR_POST_DATA) {
    return {
      ...state,
      postData: {
        creator: "",
        title: "",
        message: "",
        tags: [],
        selectedFile: "",
      },
      editID: false,
    };
  }
  if (action.type === DELETE_POST) {
    const newPosts = state.posts.filter((item) => {
      if (item._id !== action.payload._id) {
        return item;
      }
    });
    return { ...state, posts: newPosts, isDelete: true };
  }
  if (action.type === LIKE_POST) {
    const newPosts = state.posts.map((item) => {
      if (item._id === action.payload._id) {
        return action.payload;
      } else {
        return item;
      }
    });
    return { ...state, posts: newPosts };
  }
  if (action.type === UPDATE_PAGE_NUMBER) {
    let newPageNumber;

    if (action.payload === "inc") {
      newPageNumber = state.pageNumber + 1;
      if (
        newPageNumber > Math.ceil(state.allPosts.length / state.postPerPage)
      ) {
        newPageNumber = 1;
      }
    }
    if (action.payload === "dec") {
      newPageNumber = state.pageNumber - 1;
      if (newPageNumber < 1) {
        newPageNumber = Math.ceil(state.allPosts.length / state.postPerPage);
      }
    }
    const skip = (newPageNumber - 1) * state.postPerPage;

    const pagePosts = state.allPosts.slice(skip, skip + state.postPerPage);

    return { ...state, pageNumber: newPageNumber, posts: pagePosts };
  }
  if (action.type === "UPDATE_PAGE_NUMBER_BTN") {
    const skip = (action.payload - 1) * state.postPerPage;

    const pagePosts = state.allPosts.slice(skip, skip + state.postPerPage);

    return { ...state, pageNumber: action.payload, posts: pagePosts };
  }
  return state;
};

export default reducer;
