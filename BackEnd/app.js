const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
=======
const cors = require("cors"); 
 
const studentRouter = require("./Routes/StudentRoutes");
const instructorRouter = require("./Routes/InstructerRoutes"); 
const examRouter=require("./Routes/ExamRoutes");
>>>>>>> origin/Development


const app = express();

//Middleware
app.use("/",(req,res, next) => {
    res.send("It is working");
})


mongoose.connect("mongodb+srv://AcademicAdmin:UsHzE0AhhEcPuH5f@clusteracademic.4hese.mongodb.net/")
<<<<<<< HEAD
.then(() => console.log("Connect to MongoDB"))
.then(() => {
    app.listen(5000);
})

.catch((err) => console.log((err)));
=======
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server are running on port 5000");
    });
  })
  .catch((err) => console.log(err)); 
>>>>>>> origin/Development
