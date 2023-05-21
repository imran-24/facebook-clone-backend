import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User" 
  },
  friends: {
    type: Array 
  },
  sent: {
    type: Array
  },
  received:{
    type: Array
  }
},{
    timestamps: true
});

const Friends = mongoose.model("Friends", friendsSchema);

export default Friends;
