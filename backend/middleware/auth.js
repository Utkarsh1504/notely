
import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    // Check if the "Authorization" header is present in the request
    const authorizationHeader = req.header("Authorization");

    console.log(req.header("Authorization"));
    if (!authorizationHeader) {
      console.log("Authorization header not found");
      throw new Error();
    }

    // Extract the token from the "Authorization" header
    const token = authorizationHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user associated with the token
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      console.log("User not found");
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Authentication failed" });
  }
};
