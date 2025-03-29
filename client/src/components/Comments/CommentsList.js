import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CommentsList = () => {

  const { blogCommentsList } = useSelector((store) => store.blog);

  return (
    <div className='w-full'>
      {
        blogCommentsList?.slice(0)?.reverse()?.map((comment) => {
          const { _id, name, imgUrl } = comment?.user;
          return (
            <>
              <div className='my-6 w-full'>
                <Link to={"/author/" + _id}>
                  <section className='flex flex-row items-center justify-start gap-2'>
                    <div className='text-base text-white rounded-full'>
                      {
                        imgUrl
                          ?
                          <img src={imgUrl} alt={name?.charAt(0)} className='w-8 h-8 rounded-full object-contain' />
                          :
                          <span className='bg-[#1A8917] hover:bg-[#105a0f] w-8 h-8 flex items-center justify-center rounded-full text-white font-medium text-base'>{name?.charAt(0)}</span>
                      }
                    </div>
                    <span className='text-sm font-semibold mr-1'>{name}</span>
                  </section>
                </Link>
                <section className='p-2 pl-10' dangerouslySetInnerHTML={{ __html: comment.comment }}></section>
              </div>
              <section className='w-full h-[1px] bg-[#e9e6e6]'></section>
            </>
          )
        })
      }
    </div>
  )
}

export default CommentsList;
