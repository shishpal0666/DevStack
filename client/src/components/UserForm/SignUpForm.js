import React, { useState } from 'react'
import GoogleIcon from '../../assets/google.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const SignUpForm = ({handleSignInButton}) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }))
  }

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      const result = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {  
        "Content-Type": 'application/json', 
        "Authorization": `Bearer ${response.access_token}` }
      });
      console.log(result.data);
    }
  });

  return (
    <div className='w-[600px] h-[600px] bg-white p-6 pt-0'>
      <div className='w-full h-full flex flex-col items-center justify-evenly'>
        <h1 className='font-medium text-2xl tracking-wider text-[#4d4949]'>Sign-Up</h1>
        <section className='w-auto flex flex-col items-center justify-between'>
          <form className='flex flex-col justify-between items-start gap-4' onSubmit={handleSubmit}>
            <section className='flex flex-row items-center justify-around gap-4'>
              <input
                type="text"
                name='firstName'
                placeholder='First Name'
                value={formData.firstName}
                onChange={(e) => {handleChange(e)}}
                className='text-base p-3 pl-1 w-36 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' 
                required
                minLength={2}
                maxLength={40}
                />
              <input
                type="text"
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                className='text-base p-3 pl-1 w-40 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' 
                required
                minLength={2}
                maxLength={40}
                />
            </section>
            <input
              type="email"
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='text-base p-3 pl-1 w-80 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' 
              required
            />
            <div className='group flex justify-between items-center w-80'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='peer text-base p-3 pl-1 w-full border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' 
                required
                minLength={8}
                />
              <button className='h-full border-b-[1px] border-solid border-[#8b8787] outline-none peer-focus:border-[#1ac914] text-[#8b8787]' onClick={handleTogglePassword}>
              {
                showPassword 
                ?
                <FaEye />
                :
                <FaEyeSlash />
              }
              </button>
            </div>
            <div className='group flex justify-between items-center w-80'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='peer text-base p-3 pl-1 w-full border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' 
                required
                minLength={8}
                />
              <button className='h-full border-b-[1px] border-solid border-[#8b8787] outline-none peer-focus:border-[#1ac914] text-[#8b8787]' onClick={handleToggleConfirmPassword}>
              {
                showConfirmPassword 
                ?
                <FaEye />
                :
                <FaEyeSlash />
              }
              </button>
            </div>
            <button type='submit' className='px-4 py-2 mt-4 bg-[#1A8917] hover:bg-[#105a0f] rounded-full text-white m-auto'>
              Sign Up
            </button>
          </form>
        </section>
        <section className='flex flex-col items-center justify-start'>
          <button className='w-80 p-1 rounded-full border-[1px] border-solid border-[#242424] flex flex-row items-center justify-center text-base' onClick={() => login()}>
            <img src={GoogleIcon} alt='google' className='w-8 h-8 mr-4'/>
            Sign up with Google
          </button>
          <section className='flex items-center justify-center mt-1'>
            <span className=''>Already here ?</span>
            <button className='ml-2 p-1 text-base font-semibold text-[#1A8917]' onClick={handleSignInButton}>Sign in</button>
          </section>
        </section>
      </div>
    </div>
  )
}

export default SignUpForm;
