import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('Tag', tagSchema);