import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogDetails from '../components/Blogs/BlogDetails';
import { getBlogDetails } from '../redux/slices/blogsSlice';

const Blog = () => {

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogDetails(params.id))
  }, [params.id]);

  return (
    <div className='block m-auto max-w-[1336px] h-auto'>
      <BlogDetails />
    </div>
  )
}

export default Blog;
