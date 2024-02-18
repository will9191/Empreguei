const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
    typeOfWork: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      state: { type: String, required: true },
    },
    time: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    workMode: {
      type: String,
      required: true,
      default: 'Presencial',
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'job',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('job', jobSchema, 'jobs');
