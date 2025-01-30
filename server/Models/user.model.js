import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Full name must be at least 3 characters long"],
    maxlength: [15, "Full name must not exceed 15 characters"],
    match: /^[a-zA-Z\s]+$/,
    message: "Full name can only contain letters and spaces"
  },
  username: {
    type: String,
    required: true,
    unique: [true, "Username must be unique, Already exists."],
    trime: true,
    lowercase: true,
    minlength: [3, " username must be at least 3 characters long"],
  },
  email:{
    type:String,
    required:true,
    unique:[true,"Email is Already is in use"],
    trim:true,
    lowercase:true,
    minlength: [13,"Email must be at least 13 characters long"]
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:[8,"Password must be at least 8 characters"],
  },
  profilePhoto:{
    type:String,
    default: ""
  },
  gender:{
    type:String,
    enum:["male","female","other"],
    default: "Other",
    required: true
  }

},{
  timestamps:true
}
);

const user = mongoose.model("User", userModel)

export default user
