import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import { getBlogDetails } from '../redux/slices/blogsSlice'

const EditBlog = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const { blogDetails } = useSelector((store) => store.blog);
  const { _id, title, content, createdAt, author, tags } = blogDetails;

  useEffect(() => {
    dispatch(getBlogDetails(params.id));
  },[params.id])

  return (
    <div className='block m-auto max-w-[1336px] h-auto'>
      <BlogForm type='edit' authorId={author?._id} blogId={_id} initialTitle={title} initialContent={content} initialTagList={tags}/>
    </div>
  )
}

export default EditBlog