import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  name: { type: String, required:  true },
  leader: { type: String, required:  true },
  member: { type: [String], default: [] },
  id: { type: String },
});

export default mongoose.model("team", teamSchema);