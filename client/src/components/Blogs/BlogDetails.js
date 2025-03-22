import React from 'react'

const BlogDetails = () => {

  return (
    <div className='flex justify-center break-words'>
      <div className='md:max-w-2xl mx-6 w-full'>
        <div className='flex flex-col items-start justify-normal mt-12'>
          <section>
          <h1 className='text-4xl font-bold'>React is the most used framwork</h1>
          </section>
          <section className='mt-10 flex flex-row items-center justify-start gap-2'>
            <div className='py-1 px-[10px] bg-[#1A8917] text-base text-white rounded-full'>G</div>
            <span className='text-base font-semibold mr-1'>Git</span>
            <span className='text-[#c4bebe]'>&#8226;</span>
            <span className='text-sm text-[#585858]'>23/2/2021</span>
          </section>
          <section className='mt-10' dangerouslySetInnerHTML={{__html: `<p>this is react tutorial</p>`}}>
          </section>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails;
