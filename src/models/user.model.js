import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

export defualt model("User", userSchema)