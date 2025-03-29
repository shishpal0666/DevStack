import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewBlog, updateBlog, getAllBlogs } from '../redux/slices/blogsSlice';
import { GrFormClose } from 'react-icons/gr'; 

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4] }],
    [{ 'size': [ 'normal'] }],  
    ['bold', 'italic', 'underline', 'strike', 'blockquote',],  
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'color': [] }, { 'background': [] }], 
    [{ 'font': [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video', 'formula', 'code-block'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const BlogForm = ({type, authorId, blogId, initialTitle= '', initialContent='', initialTagList=[]}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tag, setTag] = useState();
  const [tagList, setTagsList] = useState(initialTagList);

  const handleEnterKey = (event) => {
    if(event.key === "Enter"){
      if(tag !== ''){
        setTagsList((tagList) => (
          [...tagList , tag.toLowerCase().trim()]
        ))
      }
      setTag('');
    }
  }

  const gotoIndexPage = () => {
    navigate("/", { replace: true });
    dispatch(getAllBlogs());
  }

  const handlePostButton = () => {
    if(type === 'add'){
      dispatch(createNewBlog({title, content, tagList}, gotoIndexPage));
    }
    else{
      dispatch(updateBlog({title, content, tags:tagList, blogId, authorId}, gotoIndexPage));
    }
  }

  const handleRemoveTagButton = (tag) => {
    setTagsList((tagsList) => {
      const newTagsList = tagsList.filter((item) => item !== tag);

      return newTagsList;
    })
  }

  return (
    <>
      <div className='w-[calc(100%_-_6rem)] m-12'>
        <div className='flex flex-col items-start justify-center gap-8'>
          <section className='w-[100%] flex flex-row items-center justify-between'>
            <input 
            type="text"
            value={title} 
            onChange={(e) => {setTitle(e.target.value)}}
            className="w-[80%] p-4 text-2xl border-[1px] border-solid border-[#cac7c7] outline-none placeholder:text-3xl placeholder:font-medium placeholder:text-[#a09e9e] focus:"
            placeholder="Title"
            />
            <button onClick={handlePostButton} className='px-4 py-2 bg-[#1A8917] hover:bg-[#105a0f] text-white font-medium text-base rounded-full border-none mr-4'>
              Post
            </button>
          </section>
          <div className='mb-2 w-[100%]'>
            <ReactQuill style={{width: '100%'}} placeholder='Content' modules={modules} theme="snow" value={content} onChange={setContent} />
          </div>
          <input 
            type="text"
            value={tag} 
            onChange={(e) => {setTag(e.target.value)}}
            onKeyDown={handleEnterKey}
            className="w-[80%] p-5 text-lg border-[1px] border-solid border-[#cac7c7] outline-none placeholder:text-2xl placeholder:font-medium placeholder:text-[#777373] focus:"
            placeholder="Add Tags"
            />
            <section className='flex items-center justify-start flex-wrap gap-2 w-[80%] h-auto mt-2 mb-2'>
            {
              tagList?.map((tag) => {
                return(
                  <>
                    <span className='flex flex-row items-center px-3 py-1 text-sm rounded-full bg-[#ecebeb] text-[#3b3a3a]'>
                    {tag}
                    <button onClick={() => {handleRemoveTagButton(tag)}} className='p-0 text-base ml-1'>
                      <GrFormClose />
                    </button>
                    </span>
                  </>
                )
              })
            }
            </section>
        </div>
      </div>
    </>
  )
}

export default BlogForm;
