import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true},
  password: { type: String, required: false },
  location: { type: String, required: false},
  whatsapp: { type: String, required: false},
  education: { type: String, required: false},
  portofolio: { required: false},
  endorse: { required: false},
  recommendation: { required: false},
  img: { type: String, required: false},
  skills: { type: [String], default: [] },
  id: { type: String },
  activated: {type:Boolean},
  connection:{type: [String]},
  mbti:{type:String},
  linkedin:{type:String},
  twitter:{type:String},
  instagram:{type:String},
  createdAt:{type:Date},
  updatedAt:{type:Date},
  currentPosition:{type:String}
});

export default mongoose.model("user", userSchema);