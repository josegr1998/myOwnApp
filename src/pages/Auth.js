import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserInfo,
  loginWithGoogle,
  signIn,
  login,
  setErrorFalse,
} from "../redux/actions/userActions";

const Auth = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();
  const invalidCredentials = useSelector(
    (state) => state.users.invalidCredentials
  );
  const userInfo = useSelector((state) => state.users.userInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignUp) {
      dispatch(signIn(userInfo));
      navigate("/");
    } else {
      dispatch(login(userInfo));
    }
  };

  useEffect(() => {
    if (invalidCredentials === true) {
      return;
    }
    if (invalidCredentials === false) {
      navigate("/");
    }
  }, [invalidCredentials]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    dispatch(loginWithGoogle(result, token));

    navigate("/");
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <Wrapper>
      <article className='wrap'>
        <div className='container'>
          <h2 className='title'>{!isSignUp ? "sign up" : "login"}</h2>
          <form onSubmit={handleSubmit}>
            <div className='header'>
              {!isSignUp && (
                <>
                  <input
                    type='text'
                    className='input'
                    placeholder='First Name'
                    name='firstName'
                    onChange={(e) =>
                      dispatch(updateUserInfo(e.target.name, e.target.value))
                    }
                  />
                  <input
                    type='text'
                    className='input'
                    placeholder='Last Name'
                    name='lastName'
                    onChange={(e) =>
                      dispatch(updateUserInfo(e.target.name, e.target.value))
                    }
                  />
                </>
              )}
            </div>
            {invalidCredentials && (
              <h2 className='invalid-credentials'>
                Invalid Credentials, Please Check User and Password
              </h2>
            )}
            <input
              type='text'
              className='input'
              placeholder='Email'
              name='email'
              onChange={(e) =>
                dispatch(updateUserInfo(e.target.name, e.target.value))
              }
            />
            <input
              type='password'
              className='input'
              placeholder='Password'
              name='password'
              onChange={(e) =>
                dispatch(updateUserInfo(e.target.name, e.target.value))
              }
            />
            {!isSignUp && (
              <input
                type='password'
                className='input'
                placeholder='Confirm Password'
                name='confirmPassword'
                onChange={(e) =>
                  dispatch(updateUserInfo(e.target.name, e.target.value))
                }
              />
            )}
            <button className='btn' type='submit'>
              {!isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className='s-container'>
            <button
              className='login'
              onClick={() => {
                setIsSignUp(!isSignUp);
                if (isSignUp) {
                  dispatch(setErrorFalse());
                }
              }}
            >
              {!isSignUp
                ? "Already have an account? Try Login in"
                : "Dont have an account? Sign up"}
            </button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_ID}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='btn google-btn'
                >
                  Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 1rem;
    width: 80vw;
    border-radius: 1rem;
    text-align: center;
    margin-bottom: 4rem;
  }
  .title {
    color: white;
  }
  .input {
    display: block;
    width: 80%;
    margin: 1rem auto;
    padding: 0.75rem;
    border-radius: 1rem;
    border: transparent;
    font-size: 1.2rem;
  }
  .btn {
    font-size: 1.2rem;
    width: 15rem;
    height: 3rem;
    background: var(--primary-300);
    display: block;
    margin: 0 auto;
    padding: 0.25rem;
  }
  .google-btn {
    height: 3.5rem;
    padding: 0.4rem;
  }

  .btn:hover {
    background: var(--primary-500);
  }
  .s-container {
    display: flex;
    margin-top: 2rem;
    align-items: center;
    gap: 1rem;
  }
  .login {
    font-size: 1.5rem;
    border: transparent;
    background: transparent;
    color: white;
    cursor: pointer;
  }
  .login:hover {
    color: var(--primary-200);
  }
  .invalid-credentials {
    color: white;
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: red;
    border-radius: 1rem;
    padding: 0.25rem;
  }
  @media screen and (min-width: 992px) {
    .container {
      width: 50vw;
    }
  }
`;

export default Auth;
