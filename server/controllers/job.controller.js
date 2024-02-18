const Application = require('../models/applicationSchema');
const Applicant = require('../models/applicantSchema');
const Job = require('../models/jobSchema');

const newJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
    });
    const result = await job.save();
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getJobs = async (req, res) => {
  const { q } = req.query || '';
  const { location } = req.query || '';
  const { page } = req.query || 1;

  try {
    const limit = 15;
    const startIndex = (Number(page) - 1) * limit;

    const typeOfWork = new RegExp(q, 'i');
    const city = new RegExp(location, 'i');

    const total = await Job.countDocuments({
      $and: [
        {
          typeOfWork,
        },
        {
          'address.city': city,
        },
      ],
    });

    const jobs = await Job.find({
      $and: [
        {
          typeOfWork,
        },
        {
          'address.city': city,
        },
      ],
    })
      .populate('company', 'name picture')

      .skip(startIndex)
      .limit(limit)
      .sort({ _id: -1 });
    res.json({
      total: total,
      data: jobs,
      currentPage: Number(page) || 1,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name picture')
      .populate('category', '_id name picture');

    const applicants = await Applicant.find({ job: req.params.id }).populate({
      path: 'applicants',
      model: 'applicants',
      populate: [
        {
          path: 'client',
          model: 'client',
          select: '_id picture firstName lastName',
        },
      ],
    });

    if (job) {
      res.json({ job, applicants });
    } else {
      res.send({ message: 'Vaga não encontrada' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateJob = async (req, res) => {
  try {
    const result = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteJob = async (req, res) => {
  try {
    const result = await Job.findByIdAndDelete(req.params.id);
    await Applicant.findOneAndDelete({ job: req.params.id });
    await Application.findOneAndDelete({
      'applications.job._id': req.params.id,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  newJob,
  getJobs,
  getJobDetails,
  updateJob,
  deleteJob,
};
