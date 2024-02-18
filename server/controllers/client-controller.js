const Client = require('../models/clientSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Curriculum = require('../models/curriculumSchema');
const Job = require('../models/jobSchema');
const Applicant = require('../models/applicantSchema');
const Application = require('../models/applicationSchema');
const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');

// @desc Register
// @route POST /auth
// @access Public

// const generateToken = (userid) => {
//   const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
//     expiresIn: '15m',
//   });

//   return token;
// };

const clientRegister = asyncHandler(async (req, res) => {
  try {
    const client = new Client({
      ...req.body,
    });

    // Check for duplicate
    const duplicate = await Client.findOne({ email: req.body.email });
    if (duplicate) {
      return res.status(409).json({ message: 'Duplicate Email' });
    } else {
      let result = await client.save();
      result.password = undefined;
      result.confirmPassword = undefined;
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// @desc Login
// @route POST /auth
// @access Public
const clientLogIn = async (req, res) => {
  if (req.body.email && req.body.password) {
    let client = await Client.findOne({ email: req.body.email });
    if (client) {
      const validated = await bcrypt.compare(
        req.body.password,
        client.password
      );
      if (validated) {
        client.password = undefined;
        res.send(client);
      } else {
        res.send({ message: 'Senha incorreta' });
      }
    } else {
      res.send({ message: 'Usuário não encontrado' });
    }
  } else {
    res.send({ message: 'Email e senha são necessários' });
  }
};

const getClients = asyncHandler(async (req, res) => {
  const { q } = req.query || '';
  const { page } = req.query || 1;

  try {
    const limit = 15;
    const startIndex = (Number(page) - 1) * limit;

    const firstName = new RegExp(q, 'i');

    const total = await Client.countDocuments({
      role: 'Client',
      $and: [
        {
          firstName,
        },
      ],
    });
    const clients = await Client.find({
      role: 'Client',
      $and: [
        {
          firstName,
        },
      ],
    })
      .select('-password')
      .limit(limit)
      .skip(startIndex)
      .sort({ _id: -1 });

    res.json({
      total: total,
      data: clients,
      currentPage: Number(page) || 1,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getClientDetails = async (req, res) => {
  const { page } = req.query || 1;

  try {
    const id = req.params.id;

    const client = await Client.findById(req.params.id).select('-password');

    /* const applications = await Application.aggregate([
      { $match: { client: new mongoose.Types.ObjectId(id) } },
      { $unwind: '$applications' },
      { $project: { _id: 0 } },
      { $group: { _id: client._id, count: { $sum: 1 } } },
      { $limit: 1 },
    ]);

    await Application.populate(applications, {
      path: 'client',
      model: 'client',
      select: '_id firstName',
    });

    await Application.populate(applications, {
      path: 'applications',
      model: 'applications',
      populate: [
        {
          path: 'job',
          model: 'job',
          select: '_id typeOfWork',
          populate: [
            {
              path: 'company',
              model: 'company',
              select: '_id name picture',
            },
          ],
        },
      ],
    }); */

    const applications = await Application.find({ client: req.params.id })
      .sort({ _id: -1 })
      .populate({
        path: 'applications',
        model: 'applications',
        populate: [
          {
            path: 'job',
            model: 'job',
            select: '_id typeOfWork',
            populate: [
              {
                path: 'company',
                model: 'company',
                select: '_id name picture',
              },
            ],
          },
        ],
      });

    const curriculum = await Curriculum.find({
      createdBy: req.params.id,
    });

    res.send({
      applications: applications,
      client: client,
      curriculum: curriculum,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateClientInfo = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      res.body.password = await bcrypt.hash(res.body.password, salt);
    }
    let result = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    result.password = undefined;
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateClientPicture = async (req, res) => {
  const user = req.params.id;

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user}_profile`,
      width: 500,
      height: 500,
      crop: 'fill',
    });

    const updatedUser = await Client.findByIdAndUpdate(
      req.params.id,
      { picture: result.url },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const apply = async (req, res) => {
  try {
    const applicant = await Applicant.updateOne(
      { job: req.body.jobId, 'applicants.client': { $ne: req.body.client } },
      { $push: { applicants: { client: req.body.client } } },
      { upsert: true }
    )
      .populate('job', '_id typeOfWork')
      .populate('applicants.client', '_id firstName');

    const application = await Application.updateOne(
      { client: req.body.client, 'applications.job': { $ne: req.body.jobId } },
      { $push: { applications: { job: req.body.jobId } } },
      { upsert: true }
    );

    res.json({ applicant, application });
  } catch (error) {
    res.status(500).json(error);
  }
};

const unapply = async (req, res) => {
  try {
    const applicant = await Applicant.updateOne(
      { job: req.body.jobId },
      { $pull: { applicants: { client: req.body.client } } },
      { upsert: true }
    );

    const application = await Application.updateOne(
      { client: req.body.client },
      { $pull: { applications: { job: req.body.jobId } } },
      { upsert: true }
    );

    res.json({ applicant, application });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  clientRegister,
  clientLogIn,
  getClients,
  getClientDetails,
  updateClientInfo,
  updateClientPicture,
  apply,
  unapply,
};
