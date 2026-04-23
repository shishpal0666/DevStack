import React from 'react'

const BlogCardSkeleton = () => {
  return (
    <article className='relative w-full animate-pulse'>
      <div className='flex flex-col items-start justify-start gap-4'>
        <section className='flex flex-row items-center justify-start gap-2'>
          <div className='w-8 h-8 rounded-full bg-[#e8e6e6]'></div>
          <div className='w-24 h-4 bg-[#e8e6e6] rounded'></div>
          <div className='w-16 h-4 bg-[#e8e6e6] rounded'></div>
        </section>
        <section className='flex flex-col items-start justify-start gap-2 mb-2 w-full'>
          <div className='w-[70%] h-6 bg-[#e8e6e6] rounded'></div>
          <div className='w-full h-4 bg-[#e8e6e6] rounded'></div>
          <div className='w-full h-4 bg-[#e8e6e6] rounded'></div>
          <div className='w-[60%] h-4 bg-[#e8e6e6] rounded'></div>
        </section>
        <section className='flex items-center gap-4 mt-2 mb-2'>
          <div className='w-12 h-4 bg-[#e8e6e6] rounded'></div>
          <div className='w-12 h-4 bg-[#e8e6e6] rounded'></div>
        </section>
        <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
          <div className='w-16 h-6 bg-[#e8e6e6] rounded-full'></div>
          <div className='w-20 h-6 bg-[#e8e6e6] rounded-full'></div>
          <div className='w-14 h-6 bg-[#e8e6e6] rounded-full'></div>
        </section>
      </div>
    </article>
  )
}

const BlogListSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>
          <BlogCardSkeleton />
          <div className='w-full h-[1px] bg-[#f0eeee]'></div>
        </React.Fragment>
      ))}
    </>
  )
}

export default BlogListSkeleton;
