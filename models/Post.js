import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User" 
  },
  caption: {type: String},
  fullname: {type: String},
  profilePicture: {type: String},
  img: {type: String},
  video: {type: String},
  likes: {type: Array},
  comments: {type: Array},
  shares: {type: Array},
},{
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

export default Post;
