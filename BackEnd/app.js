const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const studentRouter = require("./Routes/StudentRoutes");
const instructorRouter = require("./Routes/InstructerRoutes"); 
const examRouter = require("./Routes/ExamRoutes");
const courseRouter = require("./Routes/CourseRoutes");  // Import the router

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/students", studentRouter);
app.use("/instructors", instructorRouter);
app.use("/exams", examRouter);
app.use("/courses", courseRouter);  // Use the router

mongoose.connect("mongodb+srv://AcademicAdmin:UsHzE0AhhEcPuH5f@clusteracademic.4hese.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));