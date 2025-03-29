import React, { useState } from 'react';
import CommentsList from './CommentsList';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { postBlogComment } from '../../redux/slices/blogsSlice';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['link']
  ],
  clipboard: {
    matchVisual: false,
  },
}

const CommentSection = () => {

  const { _id } = useSelector((store) => store.blog.blogDetails);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handlePostCommentButton = () => {
    dispatch(postBlogComment({ blogId: _id, comment }));
    setComment('');
  }

  return (
    <div id='commentSection' className='mb-6 flex flex-col items-start justify-normal gap-3'>
      <span className='px-1 font-medium text-2xl '>
        Comments
      </span>
      <section className='commentForm mt-3 mb-5 w-[100%] flex flex-col gap-3'>
        <ReactQuill placeholder='Add Comment' modules={modules} theme="snow" value={comment} onChange={setComment} />
        <button onClick={handlePostCommentButton} className='mx-auto w-20 px-4 py-2 bg-[#1A8917] hover:bg-[#127011] text-white font-medium text-base rounded-full border-none'>
          Post
        </button>
      </section>
      <span className='px-1 text-base text-[#504f4f]'>
        Recent Comments
      </span>
      <section className='w-full h-[1px] bg-[#e9e6e6]'></section>
      <CommentsList />
    </div>
  )
}

export default CommentSection;
