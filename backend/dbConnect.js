import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URL);

  mongoose.connection.on("connected", () => {
    console.log("db connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("error connecting with db", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("db connection closed");
  });
};
