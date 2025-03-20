import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <div className='sticky top-0 z-10 bg-white w-full h-auto px-8 py-1 border-b-[1px] border-solid border-[#f0eeee]'>
      <div className='flex items-center justify-between'>
        <section className='m-1'>
          <div className='font-bold font-logo1 text-2xl'>DevStack</div>
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
          <Link to={'/login'} className='mx-4 my-2 px-4 py-2 bg-[#1A8917] hover:bg-[#105a0f] text-white font-medium text-base rounded-full'>Sign in</Link>
        </section>
      </div>
    </div>  
  )
}

export default Navbar