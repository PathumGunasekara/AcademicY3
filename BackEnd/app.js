const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // ✅ Import cors

const studentRouter = require("./Routes/StudentRoutes");
const instructorRouter = require("./Routes/InstructerRoutes");
<<<<<<< Updated upstream
const examRouter=require("./Routes/ExamRoutes");
=======
>>>>>>> Stashed changes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // ✅ No more error
<<<<<<< Updated upstream

app.use("/students", studentRouter);
app.use("/instructors", instructorRouter);
app.use("/exams", examRouter);
=======
>>>>>>> Stashed changes

app.use("/students", studentRouter);
app.use("/instructors", instructorRouter);

mongoose.connect("mongodb+srv://AcademicAdmin:UsHzE0AhhEcPuH5f@clusteracademic.4hese.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
