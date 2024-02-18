const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { nextDay } = require('date-fns');
const cloudinary = require('../config/cloudinary');

// @desc Register
// @route POST /auth
// @access Public

const adminRegister = asyncHandler(async (req, res) => {
  try {
    const admin = new Admin({
      ...req.body,
    });

    // Check for duplicate
    const duplicate = await Admin.findOne({ email: req.body.email });
    if (duplicate) {
      return res.status(409).json({ message: 'Duplicate Email' });
    } else {
      let result = await admin.save();
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
const adminLogIn = async (req, res) => {
  if (req.body.email && req.body.password) {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      const validated = await bcrypt.compare(req.body.password, admin.password);
      if (validated) {
        admin.password = undefined;
        res.send(admin);
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

const getAdminDetail = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.password = undefined;
      res.send(admin);
    } else {
      res.send({ message: 'No admin found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAdminPicture = async (req, res) => {
  const user = req.params.id;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user}_profile`,
      width: 500,
      height: 500,
      crop: 'fill',
    });

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      { picture: result.url },
      { new: true }
    ).select('-password');
    
    res.send(updatedAdmin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({
      role: 'Admin',
    }).select('-password');

    res.json(admins);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  adminRegister,
  adminLogIn,
  getAdminDetail,
  updateAdminPicture,
  getAdmins,
};
