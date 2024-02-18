const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
  applications: [
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
      },
      status: { type: String, default: 'Recebido' },
    },
  ],
});

module.exports = mongoose.model('application', applicationSchema);
