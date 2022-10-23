import mongoose from "mongoose";

const offerSchema = mongoose.Schema({
  teamid: { type: String, required:  true },
  to: { type: String, required:  true },
  isAccepted: { type: Boolean },
  isHold: { type: Boolean },
  id: { type: String },
  createdAt:{type:Date},
  updatedAt:{type:Date},
});

export default mongoose.model("offer", offerSchema);