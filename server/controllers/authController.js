import userModel from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";

export const registerUser = async (req, res) => {
  const { username, email, password, type } = req.body;

  const defaultLink = { url: "", title: "", icon: "" };
  const socialMedia = {
    facebook: "facebook",
    instagram: "instagram",
    twitter: "twitter",
    youtube: "youtube",
    linkedIn: "linkedIn",
  };

  try {
    const duplicateEmail = await userModel.findOne({ email });
    if (duplicateEmail) {
      return res.status(400).json({ message: "duplicate email" });
    }

    const duplicateHandle = await userModel.findOne({ userHandle: username });
    if (duplicateHandle) {
      return res.status(400).json({ message: "duplicate handle" });
    }

    const user = await userModel.create({
      userHandle: username,
      email,
      password,
      role: type,
      links: [defaultLink],
      socialMedia,
    });

    sendToken(user, 201, res, "register");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid" });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid" });
    }

    sendToken(user, 200, res, "login");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
