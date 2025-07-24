import React, { useEffect, useState } from 'react';
import { BiSolidBookmark } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import { MdOutlineModeComment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeTags } from '../../helpers/removeTags';
import { BookmarkBlog, likeBlog } from '../../redux/slices/blogsSlice';
import { toast } from "react-toastify";

const BlogCard = ({ _id, title, content, createdAt, author, tags = null, likes = [], comments = [], refreshBlogs }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plainContent = removeTags(content);

  const { email, _id: userId } = useSelector((store) => store.auth.userData);
  const { bookmarkedBlogsId } = useSelector((store) => store.blog);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked((isBookmarked) => {
      return bookmarkedBlogsId.includes(_id)
    })
  }, [bookmarkedBlogsId, _id])

  const handleBookmarkButton = () => {
    if (email) {
      dispatch(BookmarkBlog(_id));
    }
    else {
      toast.info('Please Login');
    }
  }

  // Like button handler
  const [localLikes, setLocalLikes] = useState(likes);
  const isLiked = Array.isArray(localLikes) ? localLikes.includes(userId) : false;
  const handleLikeButton = () => {
    if (email) {
      // Optimistically update UI
      if (isLiked) {
        setLocalLikes((prev) => prev.filter((id) => id !== userId));
      } else {
        setLocalLikes((prev) => [...prev, userId]);
      }
      dispatch(likeBlog(_id));
    } else {
      toast.info('Please Login');
    }
  };

  // Comment button handler
  const handleCommentButton = () => {
    navigate(`/blog/${_id}`);
  };

  return (
    <article className='relative w-full'>
      <button onClick={handleBookmarkButton} className='group p-1 absolute bottom-0 right-0'>
        <BiSolidBookmark className={`${isBookmarked ? 'text-[#1A8917] stroke-none' : 'text-white'} stroke-1 w-5 h-5 stroke-[#585858]`} />
      </button>
      <div className='flex flex-col items-start justify-start gap-4'>
        <Link to={"/author/" + author?._id}>
          <section className='flex flex-row items-center justify-start gap-2'>
            <div className='text-base text-white rounded-full'>
              {
                author?.imgUrl
                  ?
                  <img src={author?.imgUrl} alt={author?.name.charAt(0)} className='w-8 h-8 rounded-full object-contain' />
                  :
                  <span className='bg-[#1A8917] hover:bg-[#105a0f] w-8 h-8 flex items-center justify-center rounded-full text-white font-medium text-base'>{author?.name.charAt(0)}</span>
              }
            </div>
            <span className='text-sm font-semibold mr-1'>{author.name}</span>
            <span className='text-[#c4bebe]'>&#8226;</span>
            <span className='text-sm text-[#585858]'>{createdAt.split('T')[0]}</span>
          </section>
        </Link>
        <Link to={"/blog/" + _id} className='w-full'>
          <section className='flex items-center justify-between'>
            <section className='flex flex-col items-start justify-start gap-2 mb-2'>
              <h1 className='text-xl font-semibold'>{title}</h1>
              <div className='line-clamp-3 text-base font-normal'>{plainContent}</div>
            </section>
          </section>
        </Link>
        {/* Like and Comment counts */}
        <section className='flex items-center gap-4 mt-2 mb-2'>
          <button onClick={handleLikeButton} className={`flex items-center gap-1 ${isLiked ? 'text-black' : 'text-[#a19d9d]'} hover:text-black`}>
            <BiSolidLike className={`text-xl ${isLiked ? 'fill-black' : ''}`} />
            <span className='text-sm'>{Array.isArray(localLikes) ? localLikes.length : localLikes}</span>
          </button>
          <button onClick={handleCommentButton} className='flex items-center gap-1 text-[#a19d9d] hover:text-black'>
            <MdOutlineModeComment className='text-xl' />
            <span className='text-sm'>{Array.isArray(comments) ? comments.length : comments}</span>
          </button>
        </section>
        <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
          {
            tags?.map((tag) => {
              return (
                <React.Fragment key={tag}>
                  <Link to={"/topic/" + tag}>
                    <span className='px-3 py-1 text-sm rounded-full bg-[#ecebeb] text-[#3b3a3a]'>{tag}</span>
                  </Link>
                </React.Fragment>
              )
            })
          }
        </section>
      </div>
    </article>
  )
}

export default BlogCard;
