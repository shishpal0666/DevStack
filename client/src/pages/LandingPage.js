import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BlogsList from '../components/Blogs/BlogsList';
import TagsList from '../components/TagsList';
import { getAllBlogs } from '../redux/slices/blogsSlice';

const LandingPage = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllBlogs());
  },[])

  const { blogsList } = useSelector((store) => store.blog);
  console.log(blogsList);

  return (
    <div className='block m-auto max-w-[1336px]'>
      <div className='flex flex-row justify-evenly '>
        <BlogsList blogsList={blogsList}/>
        <TagsList />
      </div>
    </div>
  )
}

export default LandingPage;
