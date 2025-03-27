import { createSlice } from '@reduxjs/toolkit';
import axios from '../Api';
import { removeUserData } from './authSlice';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {  
  loading: false,
  error: {isError: false, message: ''},
  blogsData: {
    totalPages: 0,
    currentPage: 0,
    blogsList: [],
  },
  blogDetails: {},
  bookmarkedBlogsId: [],
  bookmarkedBlogs: {
    totalPages: 0,
    currentPage: 0,
    blogsList: [],
  },
  searchedBlogs: {
    totalPages: 0,
    currentPage: 0,
    blogsList: [],
  },
  userPublishedBlogs: {
    totalPages: 0,
    currentPage: 0,
    blogsList: [],
  },
  mostPopularTopics: [],
};

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    addBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: false, message: ''};
    },
    addBlogFailure: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setBlogsSuccess: (state, { payload })=> {
      state.loading = false;
      state.blogsData.blogsList = [...state.blogsData.blogsList, ...payload.data];
      state.blogsData.totalPages = payload.numberOfPages;
      state.blogsData.currentPage = payload.current;
      state.error = {isError: false, message: ''};
    },
    setBlogsFailure: (state, { payload })=> {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    resetBlogs: (state, {payload}) => {
      state.blogsData.blogsList = [];
      state.blogsData.totalPages = 0;
      state.blogsData.currentPage = 0;
    },
    setBlogDetailsSuccess: (state, { payload })=> {
      state.loading = false;
      state.blogDetails = payload;
      state.error = {isError: false, message: ''};
    },
    setBlogDetailsFailure: (state, { payload })=> {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    resetBlogDetails: (state, {payload})=>{
      state.blogDetails = {};
    },
    setMostPopularTopicsSuccess: (state, { payload })=> {
      state.mostPopularTopics = payload.data;
      state.error = {isError: false, message: ''};
    },
    setMostPopularTopicsFailure: (state, { payload })=> {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setBookmarkedBlogSuccess: (state, { payload }) => {
      state.bookmarkedBlogs.blogsList = [...state.bookmarkedBlogs.blogsList, ...payload.data];
      state.bookmarkedBlogs.totalPages = payload.numberOfPages;
      state.bookmarkedBlogs.currentPage = payload.current;
      state.error = {isError: false, message: ''};
    },
    setBookmarkedBlogFailure: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    resetBookmarkedBlogs: (state, {payload}) => {
      state.bookmarkedBlogs.blogsList = [];
      state.bookmarkedBlogs.totalPages = 0;
      state.bookmarkedBlogs.currentPage = 0;
    },
    setBookmarkedBlogIdSuccess: (state, { payload }) => {
      state.bookmarkedBlogsId = payload;
      state.error = {isError: false, message: ''};
    },
    setBookmarkedBlogIdFailure: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    setSearchedBlogsSuccess: (state, { payload })=>{
      state.loading = false;
      state.searchedBlogs.blogsList = [...state.searchedBlogs.blogsList, ...payload.data];
      state.searchedBlogs.totalPages = payload.numberOfPages;
      state.searchedBlogs.currentPage = payload.current;
      state.error = {isError: false, message: ''};
    },
    setSearchedBlogsFailure: (state, { payload })=>{
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    resetSearchedBlogs: (state, {payload}) => {
      state.searchedBlogs.blogsList = [];
      state.searchedBlogs.totalPages = 0;
      state.searchedBlogs.currentPage = 0;
    },
    setUserPublishedBlogsSuccess: (state, { payload })=>{
      state.loading = false;
      state.userPublishedBlogs.blogsList = [...state.userPublishedBlogs.blogsList, ...payload.data];
      state.userPublishedBlogs.totalPages = payload.numberOfPages;
      state.userPublishedBlogs.currentPage = payload.current;
      state.error = {isError: false, message: ''};
    },
    setUserPublishedBlogsFailure: (state, { payload })=>{
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
    resetUserPublishedBlogs: (state, {payload}) => {
      state.userPublishedBlogs.blogsList = [];
      state.userPublishedBlogs.totalPages = 0;
      state.userPublishedBlogs.currentPage = 0;
    },
  },
});

export const { setLoading, addBlogSuccess, addBlogFailure, setBlogsSuccess, setBlogsFailure, resetBlogs, setBlogDetailsSuccess, setBlogDetailsFailure, resetBlogDetails, setMostPopularTopicsSuccess, setMostPopularTopicsFailure, setBookmarkedBlogSuccess, setBookmarkedBlogFailure, resetBookmarkedBlogs, setBookmarkedBlogIdSuccess, setBookmarkedBlogIdFailure, setSearchedBlogsSuccess, setSearchedBlogsFailure, resetSearchedBlogs, setUserPublishedBlogsSuccess, setUserPublishedBlogsFailure, resetUserPublishedBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;

export const getAllBlogs = (page) => async(dispatch) => {
  if (page === undefined){
    dispatch(resetBlogs());
  }
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/blog`,{
      params:{
        page,
      }
    });
    dispatch(setBlogsSuccess(response.data));
  } catch (error) {
    console.log(error.message);
    toast.error(error.response.data.message);
    dispatch(setBlogsFailure(error.response.data.message))
  }
}

export const getBlogDetails = (blogId) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response =  await axios.get(`/blog/${blogId}`);
    dispatch(setBlogDetailsSuccess(response.data));
  } catch (error) {
    console.log(error.message);
    toast.error(error.response.data.message);
    dispatch(setBlogDetailsFailure(error.response.data.message))
  }
}

export const getBlogsByAuthor = ({userId, page}) => async(dispatch) => {
  if (page === undefined){
    dispatch(resetUserPublishedBlogs());
  }
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/blog/author/${userId}`,{
      params:{
        page,
      }
    });
    dispatch(setUserPublishedBlogsSuccess(response.data));
  } catch (error) {
    console.log(error.response.data.message);
    if(error.response.status === 401){
      dispatch(removeUserData());
    }
    toast.error(error.response.data.message);
    dispatch(setUserPublishedBlogsFailure(error.response.data.message))
  }
}

export const getSearchedBlogs = ({searchInput, page}) => async(dispatch) => {
  if (page === undefined){
    dispatch(resetSearchedBlogs());
  }
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/blog/search?`, {
      params: {
        search: searchInput,
        page,
      },
    });
    console.log(response.data);
    dispatch(setSearchedBlogsSuccess(response.data));
  } catch (error) {
    console.log(error);
    if(error.response.status === 401){
      dispatch(removeUserData());
    }
    toast.error(error.response.data.message);
    dispatch(setSearchedBlogsFailure(error.response.data.message))
  }
}

export const getBlogsByTopic = ({topicName, page}) => async(dispatch) => {
  
  if (page === undefined){
    dispatch(resetSearchedBlogs());
  }

  try {
    dispatch(setLoading(true));
    const response = await axios.get(`/blog/topic/${topicName}`,{
      params:{
        page,
      }
    });
    console.log(response.data);
    dispatch(setSearchedBlogsSuccess(response.data));

  } catch (error) {
    console.log(error);
    if(error.response.status === 401){
      dispatch(removeUserData());
    }
    toast.error(error.response.data.message);
    dispatch(setSearchedBlogsFailure(error.response.data.message))
  }
}

export const createNewBlog = (blogData, callback) => async(dispatch) => {
  const { title, content, tagList } = blogData;
  console.log(title, content, tagList);
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`/blog`, {
      title,
      content,
      tags: tagList,
    });
    console.log(response.data);
    if(callback){
      callback();
    }
    toast.success('New Blog Created Successfully');

  } catch (error) {
    console.log(error)
    if(error.response.status === 401){
      dispatch(removeUserData());
    }
    toast.error(error.response.data.message);
    dispatch(addBlogFailure(error.response.data.message))
  }
}

export const BookmarkBlog = (id) => async(dispatch) => {
  try {
    const response = await axios.post(`/blog/bookmarks/${id}`);
    console.log(response.data);
    dispatch(setBookmarkedBlogIdSuccess(response.data.data));
    toast.success(response.data.message);

  } catch (error) {
    console.log(error);
    if(error.response.status === 401){
      dispatch(removeUserData());
    }
    toast.error(error.response.data.message);
    dispatch(setBookmarkedBlogIdFailure(error.response.data.message))
  }
}

export const getBookmarkedBlogs = (page) => async(dispatch) => {
  if (page === undefined){
    dispatch(resetBookmarkedBlogs());
  }
  try {
    const response = await axios.get(`/blog/bookmarks`,{
      params:{
        page,
      }
    });
    
    dispatch(setBookmarkedBlogSuccess(response.data))
  } catch (error) {
    console.log(error)
    if(error.response.status === 401){
      dispatch(removeUserData());
    }
    dispatch(setBookmarkedBlogFailure(error.response.data.message))
  }
}

export const getPopularTopicsList = () => async(dispatch) => {
  try {
    const response = await axios.get(`/blog/topics`);

    dispatch(setMostPopularTopicsSuccess(response.data));
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    dispatch(setMostPopularTopicsFailure(error.response.data.message))
  }
}

export const updateBlog = (blogData, callback) => async(dispatch) => {
  const { blogId } = blogData;
  console.log(blogData);
  dispatch(setLoading(true));
  try {
    const response = await axios.patch(`/blog/${blogId}`, blogData);
    console.log(response);
    if(callback){
      callback();
    }
    toast.success('Blog updated');

  } catch (error) {
      console.log(error)
      if(error.response.status === 401){
        dispatch(removeUserData());
      }
      toast.error(error.response.data.message);
      dispatch(addBlogFailure(error.response.data.message));
  }
}

export const deleteBlog = (_id, callback) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.delete(`/blog/${_id}`);
    console.log(response.data);
    if(callback){
      callback();
    }
    toast.success('Blog Deleted Successfully');

  } catch (error) {
    console.log(error);
    if(error.response.status === 401){
      dispatch(removeUserData());
    }
    toast.error(error.response.data.message);
    dispatch(addBlogFailure(error.response.data.message));
  }
}
