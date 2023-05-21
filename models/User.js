import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  username:{
    type: String,
    required: true,
    unique: true

  },
  fullname:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  live:{
    type: String,
  },
  from:{
    type: String,
  },
  profilePicture:{
    type: String,
  },
  coverPicture:{
    type: String,
  },
  relationShip:{
    type: String,
  },
  religion:{
    type: String,
  },
  gender:{
    type: String,
  },
  friends: {type: Array},
  following: {type: Array},
  saved: {type: Array}
  
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
