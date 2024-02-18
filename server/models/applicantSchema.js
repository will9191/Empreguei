const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job',
  },
  applicants: [
    {
      client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
      },
      status: { type: String, default: 'Recebido' },
    },
  ],
});

module.exports = mongoose.model('applicant', applicantSchema);
