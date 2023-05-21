import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User" 
  },
  saved:{type: Array}
},{
    timestamps: true
});

const Save = mongoose.model("Save", saveSchema);

export default Save;
