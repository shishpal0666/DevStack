import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4] }],
    [{ 'size': ['small', 'normal', 'large', 'huge'] }],  
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
    ['link', {'image': ['small','large']},'video','formula','code-block'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const BlogForm = () => {

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  return (
    <>
      <div className='w-full m-16'>
        <div className='flex flex-col items-start justify-center gap-8'>
          <section className='w-[90%] flex flex-row items-center justify-between'>
            <input 
            type="text"
            value={title} 
            onChange={(e) => {setTitle(e.target.value)}}
            className="p-4 text-2xl border-[1px] border-solid border-[#ecebeb] outline-none placeholder:text-3xl placeholder:font-medium placeholder:text-[#a09e9e] focus:"
            placeholder="Title"
            />
            <button className='px-4 py-2 bg-[#1A8917] hover:bg-[#105a0f] text-white font-medium text-base rounded-full border-none mr-4'>
              Post
            </button>
          </section>
          <div className='mb-2 w-[90%]'>
            <ReactQuill style={{width: '100%'}} placeholder='Content' modules={modules} theme="snow" value={content} onChange={setContent} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogForm