const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/StudentRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use("/students", router );


mongoose.connect("mongodb+srv://AcademicAdmin:UsHzE0AhhEcPuH5f@clusteracademic.4hese.mongodb.net/")
.then(() => console.log("Connect to MongoDB"))
.then(() => {
    app.listen(5000);
})

.catch((err) => console.log((err)));