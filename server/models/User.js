import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
  },
  password: { 
    type: String, 
    required: function() {
      return !this.external_id;
    },
    trim: true,
    minlength: 8,
  },
  blogsSaved: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Blog',
  }],
  blogsCreated: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Blog',
  }],
  imgUrl: {
    type: String, 
  },
  external_type: {
    type: String, 
  },
  external_id: {
    type: String, 
    required: function() {
      return !this.password;
    },
  },
},{timestamps: true})

export default mongoose.model('User', userSchema);