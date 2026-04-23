import React from 'react'
import { useSelector } from 'react-redux'
import BlogCard from './BlogCard'
import BlogListSkeleton from './BlogListSkeleton'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

const BlogsList = ({blogsData, callback, refreshBlogs}) => {

  const {blogsList, totalPages, currentPage} = blogsData;

  const { loading } = useSelector((store) => store.blog);

  const handleShowMoreButton = () => {
    if(totalPages > currentPage){
      callback();
    }
  }

  return (
    <>
      <main className='mt-10 relative mb-10 mx-4 flex-auto md:min-w-[500px] md:max-w-[768px] flex flex-col items-start justify-start gap-6'>
      {
        blogsList.length > 0
        ?
        <>
        {
          blogsList?.map((blog, index) => {
            return(
              <React.Fragment key={blog._id}>
                <BlogCard {...blog} refreshBlogs={refreshBlogs}/>
                <div className='w-full h-[1px] bg-[#f0eeee]'></div>
              </React.Fragment>
            )
          })
        }
        {
          totalPages > currentPage
          &&
          <button onClick={handleShowMoreButton} className='mx-auto px-2 flex flex-col items-center justify-center text-slate-600 hover:text-[#1f83aa]' aria-label='Show more blogs'>
            <MdKeyboardDoubleArrowDown className='text-2xl'/>
            <div className='flex items-center justify-center text-sm font-medium'>Show More</div>
          </button>
        }
        </>
        :
        loading
        ?
        <BlogListSkeleton count={5} />
        :
        <div className='w-full flex flex-col justify-start items-start text-base font-medium text-[#585858]'>
          <span>No Blog</span>
        </div>
        
      }
      </main>
    </>
  )
}

export default BlogsList;
