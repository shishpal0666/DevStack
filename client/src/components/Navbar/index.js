import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import SearchBar from './SearchBar'
import LoginForm from '../UserForm/LoginForm'
import SignUpForm from '../UserForm/SignUpForm'

const Navbar = () => {

  const [showLoginForm, setShowLoginForm] = useState(false);
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
      { 
        showLoginForm
        && 
        <div className='fixed z-20 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-black/70 overflow-y-auto overflow-x-hidden'>
          <LoginForm handleSignUpButton={handleSignUpButton}/>
        </div>
      }
      { 
        showSignUpForm
        && 
        <div className='fixed z-20 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-black/70 overflow-y-auto overflow-x-hidden'>
          <SignUpForm handleSignInButton={handleSignInButton}/>
        </div>
      }
      <div className='sticky top-0 z-10 bg-white w-full h-auto px-8 py-1 border-b-[1px] border-solid border-[#f0eeee]'>
        <div className='flex items-center justify-between'>
          <section className='m-1'>
            <div className='font-bold font-logo1 text-2xl'>.blog</div>
          </section>
          <section className='flex flex-row items-center justify-between m-1 text-lg w-auto'>
            <SearchBar />
            <Link to={'/add-blog'} className='group mx-4 mt-2 mb-1 text-base font-normal text-[#585858] hover:text-black hover:font-medium'>
              <div className='flex items-center justify-between gap-1 mb-1'>
                <AiOutlinePlus />
                Create
              </div>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-[#a09d9d]"></span>
            </Link>
            <button className='mx-4 my-2 px-4 py-2 bg-[#1A8917] hover:bg-[#105a0f] text-white font-medium text-base rounded-full border-none' onClick={handleSignInButton}>
              Sign in
            </button>
          </section>
        </div>
      </div>  
    </>
  )
}

export default Navbar;
