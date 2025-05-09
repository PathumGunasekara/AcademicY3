import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRouter from "./Routes/StudentRoutes.js";
import instructorRouter from "./Routes/InstructerRoutes.js";
import examRouter from "./Routes/ExamRoutes.js";
import courseRouter from "./Routes/CourseRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import sessionRoutes from "./Routes/sessionRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/students", studentRouter);
app.use("/instructors", instructorRouter);
app.use("/exams", examRouter);
app.use("/courses", courseRouter);
app.use("/users", userRouter);
app.use("/api/sessions", sessionRoutes);

// MongoDB connection
const MONGO_URI = "mongodb+srv://pathumgunasekara18:933PyvRoWmqZa45f@clusteracademic.4bote2z.mongodb.net/";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));