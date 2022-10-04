import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true},
  password: { type: String, required: true },
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
  currentPosition:{type:String}
});

export default mongoose.model("user", userSchema);