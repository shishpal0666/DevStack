import React from 'react'
import BlogsList from '../components/Blogs/BlogsList';
import TagsList from '../components/TagsList';

const LandingPage = () => {
  return (
    <div className='block m-auto max-w-[1336px]'>
      <div className='flex flex-row justify-evenly '>
        <BlogsList />
        <TagsList />
      </div>
    </div>
  )
}

export default LandingPage;
