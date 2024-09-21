import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const user = new mongoose.Schema(
  {
    name: { type: String },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/4140/4140061.png",
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["creator", "brand", "agency", "admin"],
      default: "creator",
    },
    userHandle: { type: String, required: true, unique: true },
    links: [
      {
        url: { type: String },
        title: { type: String },
        icon: { type: String },
      },
    ],
    socialMedia: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      linkedIn: { type: String },
    },
  },
  { collection: "user-data-linkhub" }
);

user.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

user.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

user.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

export default mongoose.model("userData", user);
