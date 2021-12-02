import React, { useEffect } from "react";
import Form from "../components/Form";
import Posts from "../components/Posts";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions/postsActions";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts("loading"));
  }, []);

  return (
    <>
      <Posts />
      <Form />
    </>
  );
};

export default HomePage;
