import React from 'react'

const tagsList = ["React", "Angular", "Git", "Node", "Express", "VS code", "MongoDB", "Javascript", "HTMl", "CSS"]
const TagsList = () => {
  return (
    <div className='pt-10 md:min-w-[240px] md:max-w-[368px] md:block hidden border-l-[1px] border-[#f0eeee] relative'>
      <div className='sticky top-10 pl-10 flex flex-col items-start justify-start gap-6'>
        <h1 className='text-base font-medium'>Popular Topics</h1>
        <section className='flex items-center justify-start flex-wrap gap-3 w-[90%] h-auto mt-2 mb-2'>
        {
          tagsList?.map((tag) => {
            return(
              <>
                <span className='px-4 py-2 text-sm rounded-full bg-[#ecebeb] text-[#3b3a3a]'> {tag}
                </span>
              </>
            )
          })
        }
        </section>
      </div>
    </div>
  )
}

export default TagsList