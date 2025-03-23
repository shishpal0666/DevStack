import React, { useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import BlogsList from '../components/Blogs/BlogsList'
import { getBlogsByAuthor } from '../redux/slices/blogsSlice'

const UserPublishedBlogsList = ({type}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { userPublishedBlogs } = useSelector((store) => store.blog);
  const { _id } = useSelector((store) => store.auth.userData);

  useEffect(() => {
    if(type === 1){
      const userData = JSON.parse(localStorage.getItem("blog-user"));
      dispatch(getBlogsByAuthor(_id));
    }
    else{
      dispatch(getBlogsByAuthor(params.id));
    }
  }, [params.id, type]);

  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <section className='w-full flex items-center justify-between'>
        <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>
          Blogs
        </h1>
      </section>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div className='flex justify-start w-full'>
        <BlogsList blogsList={userPublishedBlogs}/>
      </div>
    </div>
  )
}

export default UserPublishedBlogsList