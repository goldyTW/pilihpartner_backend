import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  user:{type:String},
  room:{type:String},
  time:{type:Date},
  text:{type:String},
  id: { type: String },
});

export default mongoose.model("message", messageSchema);