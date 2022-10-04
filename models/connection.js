import mongoose from "mongoose";

const connectionSchema = mongoose.Schema({
  to: { type: String, required:  true },
  from: { type: String, required:  true },
  status: { type: String, required:true},
  id: { type: String },
});

export default mongoose.model("connection", connectionSchema);