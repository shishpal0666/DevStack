import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogsList from '../components/Blogs/BlogsList'
import { getBookmarkedBlogs } from '../redux/slices/blogsSlice';

const Bookmarks = () => {
  
  const dispatch = useDispatch();
  const { bookmarkedBlogs: blogsData } = useSelector((store) => store.blog)

  useEffect(() => {
    dispatch(getBookmarkedBlogs());
  },[])

  const handleShowMoreButton = () => {
    dispatch(getBookmarkedBlogs(blogsData.currentPage + 1))
  }

  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>Reading List</h1>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div className='flex justify-start w-full'>
        <BlogsList blogsData={blogsData} callback={handleShowMoreButton}/>
      </div>
    </div>
  )
}

export default Bookmarks;
