const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
      required: true,
    },
    academics: [
      {
        academic: {
          type: String,
        },
      },
    ],
    histories: [
      {
        history: {
          type: String,
        },
      },
    ],
    languages: [
      {
        language: {
          type: String,
        },
      },
    ],
    skills: [
      {
        skill: {
          type: String,
        },
      },
    ],
    goal: { type: String },
    resume: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('curriculum', curriculumSchema, 'curriculums');
