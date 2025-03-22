import React, { useState } from 'react'
import LoginForm from '../components/UserForm/LoginForm'
import SignUpForm from '../components/UserForm/SignUpForm';

const LoginPage = () => {

  const [isSignup, setIsSignup] = useState(false);
  
  const handleSignInButton = () => {
    setIsSignup(false)
  }

  const handleSignUpButton = () => {
    setIsSignup(true)
  }

  return (
    <>
       <div className='fixed z-20 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-white overflow-y-auto overflow-x-hidden'>
          <div className='w-auto shadow-2xl'>
            {
              isSignup
              ?
              <SignUpForm handleSignInButton={handleSignInButton} />
              :
              <LoginForm handleSignUpButton={handleSignUpButton} />
            }
          </div>
        </div>
    </>
  )
}

export default LoginPage;
