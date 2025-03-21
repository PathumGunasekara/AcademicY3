const mongoose = require ("mongoose");
const Schema= mongoose.Schema;

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
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    image: {
        type: String,
        required: [true, 'Instructor image is required'],
    },
    availability: [availabilitySchema],
}, {
    timestamps: true
});

module.exports = {
    Instructor: mongoose.model("InstructorModel", instructorSchema),
    Availability: mongoose.model("AvailabilityModel", availabilitySchema)
};
