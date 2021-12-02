import React from "react";
import SinglePost from "./SinglePost";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Btns from "./Btns";
import { openSidebar } from "../redux/actions/postsActions";
import { useDispatch, useSelector } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const isPosting = useSelector((state) => state.posts.isPosting);
  const isDelete = useSelector((state) => state.posts.isDelete);
  const isUpdating = useSelector((state) => state.posts.isUpdating);

  if (isLoading) {
    return (
      <Loading>
        <h2>Loading Memories...</h2>
        <div class='lds-ring'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Loading>
    );
  }
  if (isPosting) {
    return (
      <Loading>
        <h2>Posting...</h2>
        <div class='lds-ring'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Loading>
    );
  }
  if (isDelete) {
    return (
      <Loading>
        <h2>Removing Post...</h2>
        <div class='lds-ring'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Loading>
    );
  }
  if (isUpdating) {
    return (
      <Loading>
        <h2>Updating...</h2>
        <div class='lds-ring'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Loading>
    );
  }
  return (
    <Wrapper>
      <div className='title-container'>
        <h1>Latest posts</h1>
        <Btns />
        {user ? (
          <button className='btn' onClick={() => dispatch(openSidebar())}>
            create memory
          </button>
        ) : (
          <Link to='auth' className='btn' style={{ opacity: 1 }}>
            Login to create and like others people posts!
          </Link>
        )}
      </div>

      <div className='post-container'>
        {posts.map((post, index) => {
          return <SinglePost key={index} {...post} />;
        })}
      </div>
    </Wrapper>
  );
};

const Loading = styled.section`
  h2 {
    text-align: center;
    margin-top: 2rem;
  }
`;

const Wrapper = styled.section`
  .title-container {
    position: relative;
  }
  .btn {
    position: fixed;
    font-size: 1.5rem;
    bottom: 1rem;
    right: 50%;
    transform: translateX(50%);
    opacity: 0.5;
    transition: var(--transition);
    z-index: 5;
  }
  .btn:hover {
    opacity: 1;
  }
  h1 {
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: var(--primary-500);
  }
  width: 90vw; //always remember, looks better
  max-width: 1500px;
  margin: 0 auto;
  .post-container {
    @media screen and (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
      column-gap: 2rem;
    }
  }
`;

export default Posts;
