import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import BlogsList from '../components/Blogs/BlogsList'

const UserPublishedBlogsList = () => {
  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <section className='w-full flex items-center justify-between'>
        <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>
          Your Blogs
        </h1>
        <Link to={'/add-blog'} className='px-4 py-2 bg-[#1A8917] hover:bg-[#105a0f] text-white font-medium text-base rounded-full flex items-center justify-between'>
        <BiPlus className='w-5 h-5 mr-1'/>
          Add Blog
        </Link>
      </section>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div>
        <BlogsList />
      </div>
    </div>
  )
}

export default UserPublishedBlogsList