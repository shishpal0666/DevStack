import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import SearchBar from './SearchBar'
import LoginForm from '../UserForm/LoginForm'
import SignUpForm from '../UserForm/SignUpForm'
import NavbarProfileDroddown from './NavbarProfileDroddown'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { name, imgUrl } = useSelector((store) => store.auth.userData)
  const location = useLocation();

  useEffect(() => {
    closeProfileDropdown();
  },[location])

  const handleSignInButton = (e) => {
    e.stopPropagation();
    setShowLoginForm(true);
    setShowSignUpForm(false);
  }

  const handleSignUpButton = (e) => {
    e.stopPropagation();
    setShowLoginForm(false);
    setShowSignUpForm(true);
  }

  const handleCloseModal = () => {
    setShowLoginForm(false);
    setShowSignUpForm(false);
  }

  const handleToggleProfileDropdown = (e) => {
    e.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
  }

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  }

  return (
    <>
      { 
        showLoginForm
        && 
        <div className='fixed z-20 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-black/70 overflow-y-auto overflow-x-hidden'>
          <LoginForm handleSignUpButton={handleSignUpButton} gotoIndexPage={handleCloseModal}/>
        </div>
      }
      { 
        showSignUpForm
        && 
        <div className='fixed z-20 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-black/70 overflow-y-auto overflow-x-hidden'>
          <SignUpForm handleSignInButton={handleSignInButton} gotoIndexPage={handleCloseModal}/>
        </div>
      }
      <div className='sticky top-0 z-10 bg-white w-full h-auto px-8 py-1 border-b-[1px] border-solid border-[#f0eeee]'>
        <div className='flex items-center justify-between'>
          <section className='m-1'>
            <Link to={'/'}>
              <div className='font-bold font-logo1 text-2xl'>.blog</div>
            </Link>
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
            {
              name 
              ?
              <div className='mx-4 my-2 relative '>
                {
                showProfileDropdown
                &&
                <div className='absolute z-20 top-12 h-auto w-auto right-0 bg-white border-[1px] border-[#ebe8e8] border-solid shadow-md overflow-y-auto overflow-x-hidden'>
                  <NavbarProfileDroddown closeProfileDropdown={closeProfileDropdown} />
                </div>
                }
                <button className='flex items-center justify-normal border-none' onClick={handleToggleProfileDropdown}> 
                  <div className='flex items-center justify-center'>
                    {
                      imgUrl
                      ?
                      <img src={imgUrl} alt={name.charAt(0)} className='w-8 h-8 rounded-full object-contain'/>
                      : 
                      <span className='bg-[#1A8917] hover:bg-[#105a0f] w-9 h-9 flex items-center justify-center rounded-full text-white font-medium text-base'>{name.charAt(0)}</span>
                    }
                  </div>
                  <MdKeyboardArrowDown className={showProfileDropdown && 'rotate-180'}/>
                </button>
              </div>
              :
              <button className='mx-4 my-2 px-4 py-2 bg-[#1A8917] hover:bg-[#105a0f] text-white font-medium text-base rounded-full border-none' onClick={handleSignInButton}>
                Sign in
              </button>
            }
          </section>
        </div>
      </div>  
    </>
  )
}

export default Navbar;
