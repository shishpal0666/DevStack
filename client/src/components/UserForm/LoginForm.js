import React, { useState } from 'react'
import GoogleIcon from '../../assets/google.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginForm = ({handleSignUpButton}) => {

  const [formData, setFormData] = useState({email: '', password: ''})
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
        <h1 className='font-medium text-2xl tracking-wider text-[#4d4949]'>LOGIN</h1>
        <section className='flex flex-col items-center justify-between'>
          <form className='flex flex-col justify-between items-center gap-6' onSubmit={handleSubmit}>
            <input
              type="email"
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='text-base p-3 pl-1 w-72 border-b-[1px] border-solid border-[#8b8787] outline-none focus:border-[#1ac914]' 
              required
            />
            <div className='group flex justify-between items-center w-72'>
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
            <button className='px-4 py-2 mt-4 bg-[#1A8917] hover:bg-[#105a0f] rounded-full text-white'>
              Sign In
            </button>
          </form>
        </section>
        <section className='flex flex-col items-center justify-start'>
          <button className='w-72 p-1 rounded-full border-[1px] border-solid border-[#242424] flex flex-row items-center justify-center text-base' onClick={() => login()}>
            <img src={GoogleIcon} alt='google' className='w-8 h-8 mr-4'/>
            Sign in with Google
          </button>
          <section className='flex items-center justify-center mt-1'>
            <span className=''>New here ?</span>
            <button className='ml-2 p-1 text-base font-semibold text-[#1A8917]' onClick={handleSignUpButton}>Sign up</button>
          </section>
        </section>
      </div>
    </div>
  )
}

export default LoginForm;
