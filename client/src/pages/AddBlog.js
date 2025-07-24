import React from 'react';
import Navbar from '../components/Navbar';
import BlogForm from '../components/BlogForm';

const AddBlog = () => {
  return (
    <>
      <Navbar />
      <div className='block m-auto max-w-[1336px] h-auto'>
        <BlogForm type='add'/>
      </div>
    </>
  );
}

export default AddBlog;
