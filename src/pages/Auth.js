import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { updateUserInfo, loginWithGoogle, signIn, login } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(`im goin here`);
    e.preventDefault();
    if (!isSignUp) {
      signIn();
      navigate("/");
    } else {
      login();
      navigate("/");
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    loginWithGoogle(result, token);

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
                      updateUserInfo(e.target.name, e.target.value)
                    }
                  />
                  <input
                    type='text'
                    className='input'
                    placeholder='Last Name'
                    name='lastName'
                    onChange={(e) =>
                      updateUserInfo(e.target.name, e.target.value)
                    }
                  />
                </>
              )}
            </div>
            <input
              type='text'
              className='input'
              placeholder='Email'
              name='email'
              onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
            />
            <input
              type='password'
              className='input'
              placeholder='Password'
              name='password'
              onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
            />
            {!isSignUp && (
              <input
                type='password'
                className='input'
                placeholder='Confirm Password'
                name='confirmPassword'
                onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
              />
            )}
            <button className='btn' type='submit'>
              {!isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className='s-container'>
            <button className='login' onClick={() => setIsSignUp(!isSignUp)}>
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
  @media screen and (min-width: 992px) {
    .container {
      width: 50vw;
    }
  }
`;

export default Auth;
