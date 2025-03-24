const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
