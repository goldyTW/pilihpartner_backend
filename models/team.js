import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  name: { type: String, required:  true },
  leader: { type: String, required:  true },
  isConfirmed: { type: Boolean, required:  true },
  member: { type: [String], default: [] },
  github:{type:String},
  figma:{type:String},
  timeline:{type:String},
  requirement:{type:String},
  id: { type: String },
});

export default mongoose.model("team", teamSchema);