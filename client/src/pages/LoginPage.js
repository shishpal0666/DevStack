import React, { useState } from 'react'
import LoginForm from '../components/UserForm/LoginForm'
import SignUpForm from '../components/UserForm/SignUpForm';

const LoginPage = () => {

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  
  const handleSignInButton = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  }

  const handleSignUpButton = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
  }

  return (
    <>
       <div className='fixed z-20 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-white overflow-y-auto overflow-x-hidden'>
          <div className='w-auto shadow-2xl'>
            {
              showLoginForm
              ?
              <LoginForm handleSignUpButton={handleSignUpButton} />
              :
              <SignUpForm handleSignInButton={handleSignInButton} />
            }
          </div>
        </div>
    </>
  )
}

export default LoginPage