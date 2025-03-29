import express from 'express';
import mongoose from 'mongoose';

import Blog from '../models/Blog.js';
import User from '../models/User.js';

const router = express.Router();

export const getBlogs = async (req, res) => {
  const currentPage = Number(req.query.page) || 1;
  const LIMIT = 10;
  const skipPosts = (currentPage - 1) * LIMIT;
  try {
    const total = await Blog.countDocuments();
    const posts = await Blog.find().populate("author").sort({ createdAt: -1 }).limit(LIMIT).skip(skipPosts);
    res.status(200).json({ data: posts, current: Number(currentPage), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getBlogDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Blog.findById(id).populate("author").populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: { 'imgUrl': 1, 'name': 1, '_id': 1, 'email': 1 }
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createBlog = async (req, res) => {
  const blogData = req.body;

  try {
    const response = await Blog.create({ ...blogData, author: req.user._id });
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
}

export const getPopularTags = async (req, res) => {

  try {
    const response = await Blog.aggregate([{ $unwind: "$tags" }, {
      $group: { /* execute 'grouping' */
        _id: '$tags', /* using the 'token' value as the _id */
        count: { $sum: 1 } /* create a sum value */
      }
    },
    { "$sort": { "count": -1 } }
    ]).limit(15);
    return res.status(200).json({ data: response, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blogData = req.body;
  if (req.user._id.toString() !== blogData.authorId) {
    return res.status(403).json({ message: 'User is not authorized to update the data' });
  }
  else {
    try {
      const response = await Blog.findByIdAndUpdate(id, blogData, { new: true });
      res.status(201).json(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Blog.findByIdAndRemove(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getBlogsByAuthor = async (req, res) => {
  const { id } = req.params;
  const currentPage = Number(req.query.page) || 1;
  const LIMIT = 10;
  const skipBlogs = (currentPage - 1) * LIMIT;
  try {
    const total = await Blog.countDocuments({ author: id });
    const blogs = await Blog.find({ author: id }).populate("author").sort({ createdAt: -1 }).limit(LIMIT).skip(skipBlogs);

    res.status(200).json({ data: blogs, current: Number(currentPage), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getBlogsBySearch = async (req, res) => {
  let { search } = req.query;

  try {
    const searchInput = new RegExp(search, "i");
    // const blogs = await Blog.find({ $text: {$search: search}}, {tags: tag}).populate("author");
    const blogs = await Blog.find({ $or: [{ 'title': { "$regex": searchInput } }, { 'content': { "$regex": searchInput } }, { 'tags': { "$regex": searchInput } }] }).populate("author").sort({ createdAt: -1 });

    res.status(200).json({ data: blogs });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getBlogsByTopic = async (req, res) => {
  const { name } = req.params;
  const currentPage = Number(req.query.page) || 1;
  const LIMIT = 10;
  const skipBlogs = (currentPage - 1) * LIMIT;
  try {
    const total = await Blog.countDocuments({
      tags: {
        $elemMatch: {
          $regex: name,
          $options: 'i'
        }
      }
    });
    const blogs = await Blog.find({
      tags: {
        $elemMatch: {
          $regex: name,
          $options: 'i'
        }
      }
    }).populate("author").sort({ createdAt: -1 }).limit(LIMIT).skip(skipBlogs);

    res.status(200).json({ data: blogs, current: Number(currentPage), numberOfPages: Math.ceil(total / LIMIT) });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const saveUnsaveBlog = async (req, res) => {

  try {
    const user = await User.findById(req.user._id)
    const post = await Blog.findById(req.params.id);

    if (user.blogsSaved.includes(post._id.toString())) {
      user.blogsSaved = user.blogsSaved.filter((p) => p.toString() !== post._id.toString());
      await user.save();

      return res.status(200).json({ data: user.blogsSaved, success: true, message: "Blog Unsaved" });
    }
    else {
      user.blogsSaved.push(post._id);
      await user.save();

      return res.status(200).json({ data: user.blogsSaved, success: true, message: "Blog Saved" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const likeUnlikeBlog = async (req, res) => {

  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.likes.includes(req.user._id)) {
      const index = blog.likes.indexOf(req.user._id);

      blog.likes.splice(index, 1);
      await blog.save();

      return res.status(200).json({ data: blog.likes, success: true, message: "Blog Unliked" });
    }
    else {
      blog.likes.push(req.user._id);
      await blog.save();

      return res.status(200).json({ data: blog.likes, success: true, message: "Blog Liked" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const commentBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    blog.comments.push({
      user: req.user._id,
      comment: req.body.comment
    });

    await blog.save();
    await blog.populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: { 'imgUrl': 1, 'name': 1, '_id': 1, 'email': 1 }
      },
    });
    return res.status(200).json({ data: blog.comments, success: true })

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getBookmarkedBlogs = async (req, res) => {

  const currentPage = Number(req.query.page) || 1;
  const LIMIT = 10;
  const skipPosts = (currentPage - 1) * LIMIT;

  try {
    const user = await User.findById(req.user._id);
    const total = await Blog.countDocuments({ '_id': { $in: user.blogsSaved } });
    const blogs = await Blog.find({ '_id': { $in: user.blogsSaved } }).populate("author").sort({ createdAt: -1 }).limit(LIMIT).skip(skipPosts);

    res.status(200).json({ data: blogs, current: Number(currentPage), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getBookmarkedBlogsId = async (req, res) => {

  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({ data: user.blogsSaved });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default router;
