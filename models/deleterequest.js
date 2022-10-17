import mongoose from "mongoose";

const deleteRequestSchema = mongoose.Schema({
  membername: { type: String, required:  true },
  memberid:{ type:String, required:true },
  teamname: { type: String, required:  true },
  teamid:{ type:String, required:true },
  isConfirmed:{type: Boolean},
  id: { type: String },
});

export default mongoose.model("deleteRequest", deleteRequestSchema);