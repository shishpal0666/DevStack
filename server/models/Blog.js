import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    index: true,
  },
  content: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  tags: [{
    type: String,
    index: true,
  }],
  author:  {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// blogSchema.index({title: 'text', content: 'text', tags: 'text'});
export default mongoose.model('Blog', blogSchema);