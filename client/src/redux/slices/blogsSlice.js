import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
  loading: false,
  errors: null,
  blogData: [],
  bookmarkedBlogs: [],
  searchedBlogs: [],
  userPublishedBlogs: [],
};

const blogsSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    addBlogData: (state, { payload })=>{
      state.blogData = payload;
    },
    addBookmarkedBlogs: (state, { payload })=>{
      state.bookmarkedBlogs = [...state.bookmarkedBlogs, ...payload];
    },
    addSearchedBlogs: (state, { payload })=>{
      state.searchedBlogs = payload;
    },
    addUserPublishedBlogs: (state, { payload })=>{
      state.userPublishedBlogs = [...state.userPublishedBlogs, ...payload];
    },
    updateUserPublishedBlogs: (state, { payload })=>{
      state.userPublishedBlogs = payload;
    },
  },
});

export const { addBlogData, addUpdatedPostData } = blogsSlice.actions;

export default blogsSlice.reducer;

export const getSearchedPost = ({postList, searchInput}) => async dispatch => {
  if(searchInput !== ""){
    const searchedData = postList?.filter((row) => {
      const { title, content } = row;
      return(
        title.toString().toLowerCase().includes(searchInput?.toLowerCase()) || content.toString().toLowerCase().includes(searchInput?.toLowerCase())
        )
      }
    );
    dispatch(addUpdatedPostData([...searchedData]));
  }
}