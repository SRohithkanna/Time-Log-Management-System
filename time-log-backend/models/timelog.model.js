import mongoose from 'mongoose';

const TimeLogSchema = new mongoose.Schema({
  date: { type: String, required: true },
  name: { type: String, required: true },
  resourceName: { type: String },
  effortHours: { type: Number, required: true },
  remarks: { type: String,default: '',trim: true},
  startDate: { type: String },
  onboardedDate: { type: String },
  status: { type: String, default: 'Active' }
});

const TimeLog = mongoose.model('TimeLog', TimeLogSchema);

export default TimeLog;
