// index.js
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { config } from "dotenv";
import { dbConnect } from "./dbConnect.js";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import userRouter from "./routes/auth.js";
import noteRouter from "./routes/notes.js";

config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// routes
app.use("/api/auth", userRouter);
app.use("/api", noteRouter);

app.listen(PORT, () => {
  console.log(`server is running`);
});
