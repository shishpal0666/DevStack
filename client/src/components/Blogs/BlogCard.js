import React, { useEffect, useState } from 'react'
import { BiSolidBookmark } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Img from '../../assets/contact_app.png';
import { removeTags } from '../../helpers/removeTags';
import { BookmarkBlog } from '../../redux/slices/blogsSlice';
import { toast } from "react-toastify";

const BlogCard = ({ _id, title, content, createdAt, author, tags = null }) => {

  const dispatch = useDispatch();
  const plainContent = removeTags(content);

  const { email } = useSelector((store) => store.auth.userData);
  const { bookmarkedBlogsId, bookmarkedBlogs } = useSelector((store) => store.blog);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked((isBookmarked) => {
      return bookmarkedBlogsId.includes(_id)
    })
  }, [bookmarkedBlogsId])

  const handleBookmarkButton = () => {
    if (email) {
      dispatch(BookmarkBlog(_id));
    }
    else {
      toast.info('Please Login');
    }
  }

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
            {/* <section className=' w-28 h-auto overflow-hidden'>
              <img src={Img} alt="img" className=' object-cover'/>
            </section> */}
          </section>
        </Link>
        <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
          {
            tags?.map((tag) => {
              return (
                <>
                  {/* <Link to={{ pathname: "/tag", search: `?tag=${tag.toLocaleLowerCase()}` }} >  in case of passing query in link tag */}
                  <Link to={"/topic/" + tag}>
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

export default BlogCard;
