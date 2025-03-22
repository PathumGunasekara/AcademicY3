
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRouter = require("./Routes/StudentRoutes");
const instructerRouter = require("./Routes/InstructerRoutes");
const examRouter = require("./Routes/ExamRoutes");
const courseRouter = require("./Routes/CourseRoutes");

const app = express(); 

// Middleware
app.use(express.json()); 
app.use(cors());

app.use("/students", studentRouter);
app.use("/instructors", instructerRouter);
app.use("/exams", examRouter);
app.use("/courses", courseRouter);

mongoose.connect("mongodb+srv://AcademicAdmin:UsHzE0AhhEcPuH5f@clusteracademic.4hese.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));