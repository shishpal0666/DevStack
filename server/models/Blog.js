import mongoose from "mongoose";
import User from './User.js';

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
  },
  content: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
  },
  tags: [String],
  author:  {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  }
},{timestamps: true})

export default mongoose.model('Blog', blogSchema);