import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username already exists" });
    }

    const hashPasword = await bcrypt.hash(password, 10);

    const user = new User({ username: username, password: hashPasword });
    await user.save();

    res.status(201).json({ message: "user created" });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "invalid username" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "wrong password" });
    }

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
