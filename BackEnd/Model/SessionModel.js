import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: true
  },
  moduleName: {
    type: String,
    required: true
  },
  moduleCode: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;