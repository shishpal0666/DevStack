import React from 'react'
import BlogCard from './BlogCard'

const blogList = [
  {
    id: 12,
    title: "Git is the version control system ",
    content: "Version control helps developers track and manage changes to a software project’s code. As a software project grows, version control becomes essential. Take WordPress…    At this point, WordPress is a pretty big project. If a core developer wanted to work on one specific part of the WordPress codebase, it wouldn’t be safe or efficient to have them directly edit the “official” source code. Instead, version control lets developers safely work through branching and merging. With branching, a developer duplicates part of the source code (called the repository). The developer can then safely make changes to that part of the code without affecting the rest of the project.Then, once the developer gets his or her part of the code working properly, he or she can merge that code back into the main source code to make it official.",
    author: "Git",
    dateCreated: "25/05/2022",
    tagsList: ["Git","version control","Development"],
  },
  {
    id: 13,
    title: "Git",
    content: "Version control helps developers track and manage changes to a software project’s code. As a software project grows, version control becomes essential. Take WordPress…    At this point, WordPress is a pretty big project. If a core developer wanted to work on one specific part of the WordPress codebase, it wouldn’t be safe or efficient to have them directly edit the “official” source code. Instead, version control lets developers safely work through branching and merging. With branching, a developer duplicates part of the source code (called the repository). The developer can then safely make changes to that part of the code without affecting the rest of the project.Then, once the developer gets his or her part of the code working properly, he or she can merge that code back into the main source code to make it official.",
    author: "Git",
    dateCreated: "25/05/2022",
    tagsList: ["Git","version control","Development"],
  },
  {
    id: 14,
    title: "Git",
    content: "Version control helps developers track and manage changes to a software project’s code. As a software project grows, version control becomes essential. Take WordPress…    At this point, WordPress is a pretty big project. If a core developer wanted to work on one specific part of the WordPress codebase, it wouldn’t be safe or efficient to have them directly edit the “official” source code. Instead, version control lets developers safely work through branching and merging. With branching, a developer duplicates part of the source code (called the repository). The developer can then safely make changes to that part of the code without affecting the rest of the project.Then, once the developer gets his or her part of the code working properly, he or she can merge that code back into the main source code to make it official.",
    author: "Git",
    dateCreated: "25/05/2022",
  },
  {
    id: 5,
    title: "Git",
    content: "Version control helps developers track and manage changes to a software project’s code. As a software project grows, version control becomes essential. Take WordPress…    At this point, WordPress is a pretty big project. If a core developer wanted to work on one specific part of the WordPress codebase, it wouldn’t be safe or efficient to have them directly edit the “official” source code. Instead, version control lets developers safely work through branching and merging. With branching, a developer duplicates part of the source code (called the repository). The developer can then safely make changes to that part of the code without affecting the rest of the project.Then, once the developer gets his or her part of the code working properly, he or she can merge that code back into the main source code to make it official.",
    author: "Git",
    dateCreated: "25/05/2022",
    tagsList: ["Git","version control","Development"],
  },
  {
    id: 6,
    title: "Git",
    content: "Version control helps developers track and manage changes to a software project’s code. As a software project grows, version control becomes essential. Take WordPress…    At this point, WordPress is a pretty big project. If a core developer wanted to work on one specific part of the WordPress codebase, it wouldn’t be safe or efficient to have them directly edit the “official” source code. Instead, version control lets developers safely work through branching and merging. With branching, a developer duplicates part of the source code (called the repository). The developer can then safely make changes to that part of the code without affecting the rest of the project.Then, once the developer gets his or her part of the code working properly, he or she can merge that code back into the main source code to make it official.",
    author: "Git",
    dateCreated: "25/05/2022",
    tagsList: ["Git","version control","Development"],
  },
  {
    id: 76,
    title: "Git",
    content: "Version control helps developers track and manage changes to a software project’s code. As a software project grows, version control becomes essential. Take WordPress…    At this point, WordPress is a pretty big project. If a core developer wanted to work on one specific part of the WordPress codebase, it wouldn’t be safe or efficient to have them directly edit the “official” source code. Instead, version control lets developers safely work through branching and merging. With branching, a developer duplicates part of the source code (called the repository). The developer can then safely make changes to that part of the code without affecting the rest of the project.Then, once the developer gets his or her part of the code working properly, he or she can merge that code back into the main source code to make it official.",
    author: "Git",
    dateCreated: "25/05/2022",
    tagsList: ["Git","version control","Development"],
  },
]

const BlogsList = ({blogsList}) => {
  return (
    <main className='mt-10 mx-4 flex-auto md:min-w-[500px] md:max-w-[768px] flex flex-col items-start justify-start gap-6'>
      {
        blogsList?.map((blog, index) => {
          return(
            <>
              <BlogCard key={blog._id} {...blog}/>
              <div className='w-full h-[1px] bg-[#f0eeee]'></div>
            </>
          )
        })
      }
    </main>
  )
}

export default BlogsList;
