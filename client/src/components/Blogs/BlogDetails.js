import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { deleteBlog, resetBlogDetails } from '../../redux/slices/blogsSlice';
import LoadingComponent from '../LoadingComponent';

const BlogDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogDetails, loading } = useSelector((store) => store.blog);
  const { userData } = useSelector((store) => store.auth);
  const { _id, title, content, createdAt, author, tags } = blogDetails;
  
  useEffect(() => {
    dispatch(resetBlogDetails());
  },[])
  
  const gotoIndexPage = () => {
    navigate("/", { replace: true });
  }

  const handleEditButton = () => {
    navigate(`/edit-blog/${_id}`);
  }

  const handleDeleteButton = () => {
    dispatch(deleteBlog(_id, gotoIndexPage));
  }

  return (
    <div className='flex justify-center break-words'>
      <div className=' md:max-w-[52rem] relative mx-6 w-full'>
        { loading && <LoadingComponent />}
        <div className='flex flex-col items-start justify-normal mt-12'>
          <section className='w-full flex flex-row items-center justify-between'>
            <h1 className='text-4xl font-bold w-[80%]'>{title}</h1>
            <div className='flex items-center justify-start gap-3 text-2xl text-gray-600'>
              {
                !loading
                &&
                (
                author?._id === userData?._id
                &&
                <>
                  <AiOutlineEdit onClick={handleEditButton} className='cursor-pointer'/> 
                  <AiOutlineDelete onClick={handleDeleteButton} className='cursor-pointer'/>
                </>
                )
              }
            </div>
          </section>
          <section className='mt-10 flex flex-row items-center justify-start gap-2'>
            <div className=' text-base text-white rounded-full'>
              {
                !loading
                &&
                (
                author?.imgUrl 
                ?
                <img src={author.imgUrl} alt={author?.name.charAt(0)} className='w-8 h-8 rounded-full object-contain'/>
                : 
                <span className='bg-[#1A8917] px-3 py-1 rounded-full text-white font-medium text-base '>{author?.name.charAt(0)}</span>
                )
              }
            </div>
            <span className='text-base font-semibold mr-1'>{author?.name}</span>
            <span className='text-[#c4bebe]'>&#8226;</span>
            <span className='text-sm text-[#585858]'>{createdAt?.split('T')[0]}</span>
          </section>
          <section className='mx-2 my-10' dangerouslySetInnerHTML={{__html: content}}>
          </section>
          <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
          {
            tags?.map((tag) => {
              return(
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
        </div>
      </div>
    </div>
  )
}

export default BlogDetails;
