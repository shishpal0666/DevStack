import React from 'react'
import { BiSolidBookmark } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Img from '../../assets/contact_app.png';

const BlogCard = ({ id, title, content, dateCreated, author, tagsList= null }) => {

  return (
    <article className='relative'>
      <button className='group absolute bottom-0 right-0 '>
        <BiSolidBookmark className='text-white stroke-1 w-5 h-5 stroke-[#585858] group-focus:text-[#1A8917] group-focus:stroke-none'/>
      </button>
      <div className='flex flex-col items-start justify-start gap-4'>
        <section className='flex flex-row items-center justify-start gap-2'>
          <div className='py-1 px-[10px] bg-[#1A8917] text-base text-white rounded-full'>{author.charAt(0)}</div>
          <span className='text-sm font-semibold mr-1'>{author}</span>
          <span className='text-[#c4bebe]'>&#8226;</span>
          <span className='text-sm text-[#585858]'>{dateCreated}</span>
        </section>
        <Link to={"/blog/" + id}>
          <section className='flex items-center justify-between'>
            <section className='flex flex-col items-start justify-start gap-2 mb-2'>
              <h1 className='text-xl font-semibold'>{title}</h1>
              <div className='line-clamp-3'>{content}</div>
            </section>
            <section className=' overflow-hidden'>
              <img src={Img} alt="img" />
            </section>
          </section>
        </Link>
        <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
          {
            tagsList?.map((tag) => {
              return(
                <>
                  <Link to={"/tag/" + tag}>
                    <span className='px-3 py-1 text-sm rounded-full bg-[#ecebeb] text-[#3b3a3a]'>{tag}</span>
                  </Link>
                </>
              )
            })
          }
        </section>
      </div>
    </article>
  )
}

export default BlogCard