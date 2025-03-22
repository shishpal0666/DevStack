import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BlogDetails from '../components/Blogs/BlogDetails';

const Blog = () => {
  let params = useParams();

  useEffect(() => {
    // FetchDetails(params.id);
  }, [params.id]);

  return (
    <div className='block m-auto max-w-[1336px] h-auto'>
      <BlogDetails />      
    </div>
  )
}

export default Blog;
