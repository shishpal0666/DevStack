import React from 'react'
import BlogsList from '../components/Blogs/BlogsList'

const Bookmarks = () => {
  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>Reading List</h1>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div>
        <BlogsList />
      </div>
    </div>
  )
}

export default Bookmarks;
