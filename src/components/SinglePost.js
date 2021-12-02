import React from "react";
import styled from "styled-components";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import {
  updateEditID,
  deletePost,
  likePost,
  openSidebar,
} from "../redux/actions/postsActions";
import { useSelector, useDispatch } from "react-redux";

const SinglePost = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const {
    createdAt,
    _id,
    likes,
    message,
    name,
    creator,
    selectedFile,
    tags,
    title,
  } = props;

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <AiOutlineLike
            onClick={() => dispatch(likePost(user, _id))}
            className='like-icon liked'
          />{" "}
          {likes.length > 2
            ? `You and ${likes.length - 1} others liked this post`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <AiOutlineLike
            onClick={() => dispatch(likePost(user, _id))}
            className='like-icon'
          />
          {likes.length} {likes.length === 1 ? `like` : "likes"}
        </>
      );
    } else {
      return (
        <>
          <AiOutlineLike
            onClick={() => dispatch(likePost(user, _id))}
            className='like-icon'
          />{" "}
          &nbsp;like
        </>
      );
    }
  };

  return (
    <Wrapper>
      <div className='img-container'>
        <img src={selectedFile} alt='' className='img' />
        {user && user.result._id === creator && (
          <BsThreeDots
            className='icon'
            onClick={() => {
              dispatch(openSidebar());
              dispatch(updateEditID(_id));
            }}
          />
        )}
      </div>

      <div className='main-info'>
        <h2 className='title'>{title}</h2>

        <h2 className='time-stamp'>{moment(createdAt).fromNow()}</h2>
      </div>
      <div className='info'>
        <p className='desc'>{message}</p>
        <p className='tags'>{tags.map((tag) => `#${tag} `)}</p>
        <p className='tags'>
          By <span>{name}</span>
        </p>
      </div>
      <p className='like'>
        <div className='t-icon'>
          <Likes />
        </div>

        {user && user.result._id === creator && (
          <div className='trash-icon  t-icon'>
            <FaTrash onClick={() => dispatch(deletePost(_id, user))} />
          </div>
        )}
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  position: relative;
  margin: 0 auto;
  background-color: var(--grey-300);
  border-radius: 1rem;
  padding-top: 0;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 30rem;

  .img-container {
    width: 100%;
    height: 20rem;
    margin: 0 auto;
    position: relative;
  }
  .img {
    border-radius: 1rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .icon {
    position: absolute;
    color: white;
    top: 1rem;
    right: 1rem;
    font-size: 1.9rem;
    opacity: 0;
    transition: all 0.3s linear;
    cursor: pointer;
  }
  .img-container:hover {
    .icon {
      opacity: 1;
    }
  }
  .icon:hover {
    color: var(--primary);
    transform: scale(1.1);
  }
  .time-stamp {
    font-size: 1.2rem;
  }
  .main-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .info {
    padding: 1rem;
    .tags {
      font-size: 1.2rem;
      margin-top: 1rem;
      span {
        color: var(--primary-500);
        text-transform: capitalize;
      }
    }
    .desc {
      font-size: 1.1rem;
      margin: 0 auto;
      max-width: 40rem;
    }
  }
  .like {
    font-size: 1.2rem;
    padding: 1rem;
    padding-top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .liked {
    color: var(--primary-500);
  }
  .t-icon {
    cursor: pointer;
    transition: var(--transition);
  }
  .trash-icon:hover {
    color: red;
    transform: scale(1.1);
  }
  .like-icon {
    transition: var(--transition);
  }
  .like-icon:hover {
    color: var(--primary-500);
    transform: scale(1.1);
  }
`;

export default SinglePost;
