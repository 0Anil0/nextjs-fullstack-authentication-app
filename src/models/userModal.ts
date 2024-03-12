import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { stringify } from "querystring";

const userModalSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "PLease provide email"],
    unique: true,
  },
  password: String,
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.model("user", userModalSchema);

export default User;
