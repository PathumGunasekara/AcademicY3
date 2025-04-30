const express = require("express");
const mongoose = require("mongoose");
const studentRouter = require("./Routes/StudentRoutes");
const instructerRouter = require("./Routes/InstructerRoutes");
const examRouter = require("./Routes/ExamRoutes");
const courseRouter = require("./Routes/CourseRoutes");
const userrouter = require("./Routes/UserRoutes");  

const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

app.use("/students", studentRouter);
app.use("/instructors", instructerRouter);
app.use("/exams", examRouter);
app.use("/courses", courseRouter);
app.use("/users",userrouter);


mongoose.connect("mongodb+srv://pathumgunasekara18:6mds5xVoAQTXomkB@clusteracademic.4bote2z.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));
