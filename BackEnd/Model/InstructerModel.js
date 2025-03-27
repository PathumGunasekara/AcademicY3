const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
    day: {
        type: String,
        required: [true, 'Day is required'],
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
    }
}, { _id: false });

const instructorSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    faculty: {
        type: String,
        required: [true, 'Faculty is required'],
        enum: ['Faculty of Computing', 'Faculty of Engineering', 'Faculty of Business'],
    },
    availability: [availabilitySchema],
}, {
    timestamps: true
});

module.exports = {
    Instructor: mongoose.model("InstructorModel", instructorSchema),
    Availability: mongoose.model("AvailabilityModel", availabilitySchema)
};
