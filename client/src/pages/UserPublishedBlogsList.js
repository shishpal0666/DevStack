import React, { useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import BlogsList from '../components/Blogs/BlogsList'
import { getBlogsByAuthor } from '../redux/slices/blogsSlice'

const UserPublishedBlogsList = ({ type }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const { userPublishedBlogs: blogsData } = useSelector((store) => store.blog);
  const { _id } = useSelector((store) => store.auth.userData);

  useEffect(() => {
    if (type === 1) {
      dispatch(getBlogsByAuthor({ userId: _id }));
    }
    else {
      dispatch(getBlogsByAuthor({ userId: params.id }));
    }
  }, [params.id, type, _id]);

  const handleShowMoreButton = () => {
    if (type === 1) {
      dispatch(getBlogsByAuthor({ userId: _id, page: blogsData?.currentPage + 1 }));
    }
    else {
      dispatch(getBlogsByAuthor({ userId: params.id, page: blogsData?.currentPage + 1 }));
    }
  }

  return (
    <div className='p-14 flex flex-col items-start justify-start gap-4'>
      <section className='w-full flex items-center justify-between'>
        <h1 className='font-semibold tracking-wider text-3xl text-[#333131]'>
          {
            type === 1 ? (
              'My Blogs'
            ) : (
              `${blogsData?.blogsList?.[0]?.author?.name || 'User'}'s Blogs`
            )
          }
        </h1>
      </section>
      <div className='w-full h-[1px] bg-[#f0eeee] mt-6'></div>
      <div className='flex justify-start w-full'>
        <BlogsList blogsData={blogsData} callback={handleShowMoreButton} />
      </div>
    </div>
  )
}

export default UserPublishedBlogsList