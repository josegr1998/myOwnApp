import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { logout, setErrorFalse } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);

  return (
    <Wrapper>
      <h2 className='title'>
        <Link to='/' style={{ color: "white" }} className='main-icon'>
          Memories <span>App</span>
        </Link>
      </h2>
      {user ? (
        <>
          <div className='user-info'>
            <Avatar
              style={{ background: "purple" }}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}{" "}
              {/*porque cuando me logeo no proveo imagen */}
            </Avatar>
            <p style={{ textTransform: "capitalize" }}>{user.result.name}</p>
            <button
              className='login'
              onClick={() => {
                dispatch(logout());
                dispatch(setErrorFalse());
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <Link to='/auth' className='login' onClick={setErrorFalse}>
          Login
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 4rem;
  align-items: center;
  background: var(--primary-500);
  padding-right: 1rem;
  padding-left: 1rem;

  .login {
    width: 7rem;
    text-align: center;
    font-size: 1.5rem;
    background-color: transparent;
    border: transparent;
    color: white;
    transition: var(--transition);
  }
  button:hover {
    color: var(--primary-900);
    cursor: pointer;
  }
  span {
    color: white;
  }
  .title {
    color: white;
    font-size: 1.4rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 2rem;
    p {
      font-size: 1.2rem;
      color: white;
      display: none;
    }
  }

  @media screen and (min-width: 992px) {
    .user-info {
      p {
        display: block;
      }
    }
    .title {
      font-size: 2.5rem;
    }
  }
`;

export default Nav;
