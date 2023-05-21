import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {type: String},
  sender:{type: String},
  message:{type: String}
},{
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;