import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { BiSolidLike } from 'react-icons/bi';
import { MdOutlineModeComment } from 'react-icons/md';
import { deleteBlog, likeBlog, resetBlogDetails, getAllBlogs } from '../../redux/slices/blogsSlice';
import LoadingComponent from '../LoadingComponent';
import { toast } from 'react-toastify';
import { Link as LinkScroll } from 'react-scroll';
import CommentSection from '../Comments/CommentSection';

const BlogDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogDetails, loading, blogLikesNumber, blogCommentsList } = useSelector((store) => store.blog);
  const { userData } = useSelector((store) => store.auth);
  const { _id, title, content, createdAt, author, tags, likes } = blogDetails;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked((isLiked) => {
      return blogLikesNumber?.includes(userData._id);
    })
  }, [blogLikesNumber]);

  useEffect(() => {
    dispatch(resetBlogDetails());
  }, [])

  const gotoIndexPage = () => {
    navigate("/", { replace: true });
    dispatch(getAllBlogs());
  }

  const handleEditButton = () => {
    navigate(`/edit-blog/${_id}`);
  }

  const handleDeleteButton = () => {
    dispatch(deleteBlog(_id, gotoIndexPage));
  }

  const handleLikeButton = () => {
    if (userData?.email) {
      dispatch(likeBlog(_id));
    }
    else {
      toast.info('Please Login');
    }
  }

  const handleCommentButton = () => {
    toast.info('Work in progress');
  }

  return (
    <div className='flex justify-center break-words'>
      <div className=' md:max-w-[52rem] relative mx-6 w-full'>
        {
          loading
            ?
            <LoadingComponent />
            :
            _id
              ?
              <>
                <div className='flex flex-col items-start justify-normal my-12'>
                  <section className='w-full flex flex-row items-center justify-between'>
                    <h1 className='text-4xl font-bold w-[80%] mb-4'>{title}</h1>
                    <div className='flex items-center justify-start gap-3 text-2xl'>
                      {
                        author?._id === userData?._id
                        &&
                        <>
                          <HiPencil onClick={handleEditButton} className='cursor-pointer text-[#918e8e] hover:text-[#474444]' />
                          <MdDelete onClick={handleDeleteButton} className='cursor-pointer text-[#918e8e] hover:text-[#474444]' />
                        </>
                      }
                    </div>
                  </section>
                  <section className='my-6 flex flex-row items-center justify-start gap-2'>
                    <Link className='flex items-center justify-start gap-2' to={"/author/" + author?._id}>
                      <div className='text-base text-white rounded-full'>
                        {
                          author?.imgUrl
                            ?
                            <img src={author.imgUrl} alt={author?.name.charAt(0)} className='w-8 h-8 rounded-full object-contain' />
                            :
                            author?.name.charAt(0)
                            &&
                            <span className='bg-[#1A8917] hover:bg-[#105a0f] w-9 h-9 flex items-center justify-center rounded-full text-white font-medium text-base'>{author?.name.charAt(0)}</span>
                        }
                      </div>
                      <span className='text-base font-semibold mx-1'>{author?.name}</span>
                    </Link>
                    <span className='text-[#c4bebe]'>&#8226;</span>
                    <span className='text-sm text-[#585858]'>{createdAt?.split('T')[0]}</span>
                  </section>
                  <section className='w-full h-[1px] bg-[#f0eeee]'></section>
                  <section className='flex items-center justify-start gap-10 my-4 mx-4 '>
                    <section className='flex items-center justify-start gap-2'>
                      <button onClick={handleLikeButton} className='p-1'>
                        <BiSolidLike className={`${isLiked ? ' fill-black' : 'text-[#a19d9d]'} text-xl`} />
                      </button>
                      <span className='text-sm'>{blogLikesNumber.length}</span>
                    </section>
                    <section className='flex items-center justify-start gap-2'>
                      <LinkScroll
                        to="commentSection"
                        spy={true}
                        smooth={true}
                        duration={100}
                        offset={-100}
                        className='p-1 cursor-pointer text-xl text-[#a19d9d] hover:text-black active:text-black focus:text-black group'
                        activeClass='text-black'
                      >
                        <MdOutlineModeComment />
                      </LinkScroll>
                      <span className='text-sm'>{blogCommentsList.length}</span>
                    </section>
                  </section>
                  <section className='w-full h-[1px] bg-[#f0eeee]'></section>
                  <section className='mx-2 my-10' dangerouslySetInnerHTML={{ __html: content }}>
                  </section>
                  <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
                    {
                      tags?.map((tag) => {
                        return (
                          <>
                            {/* <Link to={{ pathname: "/search", search: `?tag=${tag.toLocaleLowerCase()}` }} >  in case of passing tag as search query params*/}
                            <Link to={"/topic/" + tag}>
                              <span className='px-3 py-1 text-sm rounded-full bg-[#ecebeb] text-[#3b3a3a]'>{tag}</span>
                            </Link>
                          </>
                        )
                      })
                    }
                  </section>
                  <section className='mt-14 w-full'>
                    <CommentSection />
                  </section>
                </div>
              </>
              :
              <span className=' h-[400px] flex items-center justify-center text-[#585858] text-lg'>404 Not found</span>
        }
      </div>
    </div>
  )
}

export default BlogDetails;
