const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // ✅ Import cors
 
const studentRouter = require("./Routes/StudentRoutes");
const instructorRouter = require("./Routes/InstructerRoutes"); 
const examRouter=require("./Routes/ExamRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // ✅ No more error

app.use("/students", studentRouter);
app.use("/instructors", instructorRouter);
app.use("/exams", examRouter);


mongoose.connect("mongodb+srv://AcademicAdmin:UsHzE0AhhEcPuH5f@clusteracademic.4hese.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server are running on port 5000");
    });
  })
  .catch((err) => console.log(err)); 
