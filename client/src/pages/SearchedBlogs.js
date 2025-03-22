import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BlogsList from '../components/Blogs/BlogsList'

const SearchedBlogs = () => {

  const params = useParams();

  useEffect(() => {
    
  },[params.name])

  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>Results for {params.name}</h1>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div>
        <BlogsList />
      </div>
    </div>
  )
}

export default SearchedBlogs;
