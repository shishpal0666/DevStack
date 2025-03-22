import { createSlice } from '@reduxjs/toolkit';
import axios from '../Api';

const initialState = {  
  loading: false,
  errors: null,
  blogsList: [],
  blogDetails: {},
  bookmarkedBlogs: [],
  searchedBlogs: [],
  authorPublishedBlogs: [],
};

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    addBlogs: (state, { payload })=> {
      state.loading = false;
      state.blogsList = payload;
    },
    addBlogDetails: (state, { payload })=> {
      state.loading = false;
      state.blogDetails = payload;
    },
    addBookmarkedBlogs: (state, { payload })=>{
      state.loading = false;
      state.bookmarkedBlogs = [...state.bookmarkedBlogs, ...payload];
    },
    addSearchedBlogs: (state, { payload })=>{
      state.loading = false;
      state.searchedBlogs = payload;
    },
    addAuthorPublishedBlogs: (state, { payload })=>{
      state.loading = false;
      state.authorPublishedBlogs = [...state.authorPublishedBlogs, ...payload];
    },
    updateUserPublishedBlogs: (state, { payload })=>{
      state.authorPublishedBlogs = payload;
    },
  },
});

export const { setLoading, addBlogs, addBlogDetails, addSearchedBlogs, addUpdatedPostData } = blogsSlice.actions;

export default blogsSlice.reducer;

export const getAllBlogs = () => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = axios.get(`/blog`);
    dispatch(addBlogs(response.data));
  } catch (error) {
    
  }
}

export const getBlogDataById = (blogId) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = axios.get(`/blog/${blogId}`);
    dispatch(addBlogDetails(response.data));
  } catch (error) {
    
  }
}

export const getSearchedBlogs = (searchInput) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = axios.get(`/blog`,{
      params: {
        search: searchInput,
      }
    });
    dispatch(addSearchedBlogs(response.data));
  } catch (error) {
    
  }
}

export const getBlogsByAuthor = (userId) => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = axios.get(`/author/${userId}`);
    dispatch(addBlogsByAuthor(response.data));
  } catch (error) {
    
  }
}

export const getBookmarkedBlogs = () => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = axios.get(`/blog/${blogId}`);
    dispatch(addBlogDetails(response.data));
  } catch (error) {
    
  }
}

export const updateBookmarkedBlogs = () => async(dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = axios.get(`/blog/${blogId}`);
    dispatch(addBlogDetails(response.data));
  } catch (error) {
    
  }
}




