import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user";
import mongoose from "mongoose";
import postRoute from "./routes/post";

// Load environment variables
dotenv.config();

const app = express();

// MongoDB connection string with a fallback URL
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/auth";

// MongoDB connection
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Port configuration
const PORT = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS configuration with safety checks
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Fallback to localhost for development
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Route configuration
app.use("/", userRouter);
app.use("/post", postRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
