const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    // a set of userId within an array
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(), 
  },
  
});

const Post = mongoose.model("Post", postSchema);

exports.Post = Post;
