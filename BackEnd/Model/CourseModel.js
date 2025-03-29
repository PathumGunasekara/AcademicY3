const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
    }
});

module.exports = mongoose.model("CourseModel", courseSchema);
