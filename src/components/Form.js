import React from "react";
import styled from "styled-components";
import { usePostContext } from "../context/PostContext";
import FileBase from "react-file-base64";
import { FaTimes } from "react-icons/fa";

const Form = () => {
  const {
    postData,
    updatePostData,
    updateImage,
    isSidebarOpen,
    closeSidebar,
    createPost,
    editID,
    updatePost,
    clearPostData,
  } = usePostContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editID) {
      createPost();
      closeSidebar();
    } else {
      updatePost(editID, postData);
      closeSidebar();
      clearPostData();
    }
  };
  const close = () => {
    closeSidebar();
    if (editID) {
      clearPostData();
    }
  };

  return (
    <Wrapper>
      <section className={isSidebarOpen && "show"}>
        <article className='container'>
          <div className='header'>
            <h2 className='title'>{editID ? "Edit Post" : "Create Post"}</h2>
            <FaTimes className='close' onClick={close} />
          </div>

          <form onSubmit={handleSubmit}>
            {/*it would be better to have the labels */}
            {/* <input
              className='input'
              type='text'
              placeholder='creator'
              name='creator'
              value={postData.creator}
              onChange={(e) => {
                updatePostData(e.target.name, e.target.value);
              }}
            /> */}

            <input
              className='input'
              type='text'
              placeholder='title'
              name='title'
              value={postData.title}
              onChange={(e) => {
                updatePostData(e.target.name, e.target.value);
              }}
            />
            <input
              className='input'
              type='text'
              placeholder='message'
              name='message'
              value={postData.message}
              onChange={(e) => {
                updatePostData(e.target.name, e.target.value);
              }}
            />
            <input
              className='input'
              type='text'
              placeholder='tags e.g.g holidays,family'
              name='tags'
              value={postData.tags}
              onChange={(e) => {
                updatePostData(e.target.name, e.target.value);
              }}
            />
            <div className='file-container'>
              <p style={{ fontSize: "1.2rem" }}>Image</p>
              <FileBase
                className='file'
                type='file'
                multiple={false}
                onDone={
                  (base64) => updateImage(base64.base64) //importante agregar
                }
              />
            </div>

            <button className='post-btn' type='submit'>
              {editID ? "Edit" : "Post"}
            </button>
          </form>
        </article>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  section {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    z-index: -5;
    background: rgba(46, 49, 49, 0.7);

    opacity: 0;
    transition: var(--transition);
  }
  .show {
    z-index: 10;
    opacity: 1;
  }

  .container {
    background: white;
    border-radius: 1rem;
    padding: 1rem;
    min-width: 60vw;
    max-width: 80vw;
    background: var(--grey-300);
  }
  .title {
    text-align: center;
    margin: 0 auto;
    font-size: 2rem;
  }
  .header {
    margin-bottom: 1rem;
  }
  .input {
    display: block;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    padding: 0.75rem;
    border-radius: 1rem;
    border: 1px solid var(--primary-500);
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .file {
    display: block;
    margin-left: 2rem;
  }
  .post-btn {
    display: block;
    width: 15rem;
    margin: 0 auto;
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 1rem;
    border: transparent;
    transition: var(--transition);
    background: var(--primary-300);
    color: white;
  }
  .file-container {
    width: 7rem;
    display: block;
    margin-left: 4rem;
    margin-bottom: 1rem;
  }
  .post-btn:hover {
    background: var(--primary-500);
    color: white;
    cursor: pointer;
  }
`;

export default Form;
