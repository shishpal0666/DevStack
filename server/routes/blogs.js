import express from 'express';
import { createBlog, getBlogDetails, getBlogs, getBlogsByAuthor, getBlogsBySearch, saveUnsaveBlog, getBookmarkedBlogs, getBookmarkedBlogsId, getPopularTags, getBlogsByTopic, updateBlog, deleteBlog, likeUnlikeBlog, commentBlog } from '../controllers/blogs.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getBlogsBySearch);
router.get('/topic/:name', getBlogsByTopic);
router.get('/author/:id', auth, getBlogsByAuthor);
router.get('/bookmarks', auth, getBookmarkedBlogs);
router.get('/bookmarksId', auth, getBookmarkedBlogsId);
router.get('/populartags', getPopularTags);
router.get('/', getBlogs);
router.get('/topics', getPopularTags);
router.get('/:id', getBlogDetails);

router.post('/bookmarks/:id', auth, saveUnsaveBlog);
router.post('/commentBlog/:id', auth, commentBlog);
router.get('/likeBlog/:id', auth, likeUnlikeBlog);
router.post('/', auth, createBlog);
router.patch('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

export default router;