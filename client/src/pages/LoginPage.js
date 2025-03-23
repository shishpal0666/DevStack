import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/UserForm/LoginForm'
import SignUpForm from '../components/UserForm/SignUpForm';

const LoginPage = () => {

  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSignInButton = (e) => {
    e.stopPropagation();
    setIsSignup(false)
  }
  
  const handleSignUpButton = (e) => {
    e.stopPropagation();
    setIsSignup(true)
  }

  const gotoIndexPage = () => {
    navigate("/");
  }

  return (
    <>
       <div className='fixed z-20 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-white overflow-y-auto overflow-x-hidden'>
          <div className='w-auto shadow-2xl border-[1px] border-solid border-[#e9e4e4]'>
            {
              isSignup
              ?
              <SignUpForm handleSignInButton={handleSignInButton} gotoIndexPage={gotoIndexPage} />
              :
              <LoginForm handleSignUpButton={handleSignUpButton} gotoIndexPage={gotoIndexPage} />
            }
          </div>
        </div>
    </>
  )
}

export default LoginPage;
