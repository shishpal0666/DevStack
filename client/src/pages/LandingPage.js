import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BlogsList from '../components/Blogs/BlogsList';
import TagsList from '../components/TagsList';
import { getAllBlogs, getBookmarkedBlogs, getPopularTopicsList } from '../redux/slices/blogsSlice';

const LandingPage = () => {

  const dispatch = useDispatch();
  const { blogsData } = useSelector((store) => store.blog);
  
  const handleShowMoreButton = () => {
    dispatch(getAllBlogs(blogsData.currentPage + 1))
  }

  return (
    <div className='block m-auto max-w-[1336px]'>
      <div className='flex flex-row justify-evenly '>
        <BlogsList blogsData={blogsData} callback={handleShowMoreButton}/>
        <TagsList />
      </div>
    </div>
  )
}

export default LandingPage;
