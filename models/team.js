import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  name: { type: String, required:  true },
  leader: { type: String, required:  true },
  description: { type: String },
  isConfirmed: { type: Boolean, required:  true },
  member: { default: [] },
  member2: { default:[]},
  github:{type:String},
  figma:{type:String},
  timeline:{type:String},
  requirement:{type:String},
  isFinished:{type:Boolean},
  createdAt:{type:Date},
  updatedAt:{type:Date},
  id: { type: String },
});

export default mongoose.model("team", teamSchema);