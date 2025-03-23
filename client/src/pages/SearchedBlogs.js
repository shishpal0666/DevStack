import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import BlogsList from '../components/Blogs/BlogsList'
import { getBlogsByTopic, getSearchedBlogs } from '../redux/slices/blogsSlice'

const SearchedBlogs = ({type}) => {

  const dispatch = useDispatch();
  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const { searchedBlogs: blogsData } = useSelector((store) => store.blog);

  const searchInput = searchParams.get('search');

  useEffect(() => {
    if(type === "search"){
      dispatch(getSearchedBlogs({searchInput}));
    }
    else{
      dispatch(getBlogsByTopic({topicName: params.name}));
    }
  },[searchParams, params.name, type])

  const handleShowMoreButton = () => {
    if(type === "search"){
      dispatch(getSearchedBlogs({searchInput, page:blogsData.currentPage + 1}));
    }
    else{
      dispatch(getBlogsByTopic({topicName: params.name, page:blogsData.currentPage + 1}));
    }
  }

  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>Results for {params.name} {searchInput}</h1>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div className='flex justify-start w-full'>
        <BlogsList blogsData={blogsData} callback={handleShowMoreButton}/>
      </div>
    </div>
  )
}

export default SearchedBlogs;
