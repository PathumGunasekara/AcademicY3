const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  Name: {
    type: String, //date type
    require: true, //validate
  },
  Id: {
    type: String, //date type
    require: true, //validation
  },
  Course: {
    type: String, //date type
    require: true, //validation
  },
  DateOfBirth: {
    type: String, //date type
    require: true, //validation
  },
  Gender: {
    type: String, //date type
    require: true, //validation
  },
  Phone: {
    type: Number, //date type
    require: true, //validation
  },
  Email: {
    type: String, //date type
    require: true, //validation
  },
  Address: {
    type: String, //date type
    require: true, //validation
  },
});

module.exports = mongoose.model(
  "StudentModel", //file name
  studentSchema //function name
);
