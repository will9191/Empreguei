const Company = require('../models/companySchema');
const Job = require('../models/jobSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');

// @desc Register
// @route POST /auth
// @access Public

/* const generateToken = (userid) => {
  const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  return token;
}; */

const companyRegister = asyncHandler(async (req, res) => {
  try {
    const company = new Company({
      ...req.body,
    });

    // Check for duplicate
    const duplicate = await Company.findOne({ email: req.body.email });
    if (duplicate) {
      return res.status(409).json({ message: 'Duplicate Email' });
    } else {
      let result = await company.save();
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
const companyLogIn = asyncHandler(async (req, res) => {
  if (req.body.email && req.body.password) {
    let company = await Company.findOne({ email: req.body.email });
    if (company) {
      const validated = await bcrypt.compare(
        req.body.password,
        company.password
      );
      if (validated) {
        company.password = undefined;
        res.send(company);
      } else {
        res.send({ message: 'Senha incorreta' });
      }
    } else {
      res.send({ message: 'Usuário não encontrado' });
    }
  } else {
    res.send({ message: 'Email e senha são necessários' });
  }
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired

const getCompanies = async (req, res) => {
  const { q } = req.query || '';
  const { location } = req.query || '';
  const { page } = req.query || 1;

  try {
    const limit = 15;
    const startIndex = (Number(page) - 1) * limit;

    const name = new RegExp(q, 'i');
    const city = new RegExp(location, 'i');

    const total = await Company.countDocuments({
      role: 'Company',
      $and: [
        {
          name,
        },
        {
          'address.city': city,
        },
      ],
    });
    const companies = await Company.find({
      role: 'Company',
      $and: [
        {
          name,
        },
        { 'address.city': city },
      ],
    })
      .select('-password')
      .limit(limit)
      .skip(startIndex)
      .sort({ _id: -1 });

    res.json({
      total: total,
      data: companies,
      currentPage: Number(page) || 1,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCompanyJobs = async (req, res) => {
  const { page } = req.query || 1;

  try {
    const limit = 15;
    const startIndex = (Number(page) - 1) * limit;

    const company = await Company.findById(req.params.id).select('-password');

    const total = await Job.countDocuments({
      company: req.params.id,
    });

    const jobs = await Job.find({ company: req.params.id })
      .populate('company', '_id name picture')
      .skip(startIndex)
      .limit(limit)
      .sort({ _id: -1 });

    res.send({
      company: company,
      data: jobs,
      currentPage: Number(page) || 1,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCompanyDetails = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id)
      .select('-password')
      .lean();
    if (company) {
      res.send(company);
    } else {
      res.send({ message: 'No company found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// const getCompanyDetails = asyncHandler(async (req, res) => {
//   try {
//     let company = await Company.findById(req.params.id)
//       .select('-password')
//       .lean();
//     if (company) {
//     } else {
//       res.send({ message: 'No company found' });
//     }
//   } catch (err) {
//     res.status(500).json(err);
// }
// });

const updateCompanyInfo = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      res.body.password = await bcrypt.hash(res.body.password, salt);
    }
    let result = await Company.findByIdAndUpdate(
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

const updateCompanyPicture = async (req, res) => {
  const user = req.params.id;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user}_profile`,
      width: 500,
      height: 500,
      crop: 'fill',
    });

    const updatedUser = await Company.findByIdAndUpdate(
      req.params.id,
      { picture: result.url },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc Post Job
// @route POST /auth
// @access Private

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundCompany = await Company.findOne({
        email: decoded.email,
      }).exec();

      if (!foundCompany)
        return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          CompanyInfo: {
            name: foundCompany.name,
            email: foundCompany.email,
            roles: foundCompany.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie cleared' });
};

module.exports = {
  companyRegister,
  companyLogIn,
  getCompanies,
  getCompanyDetails,
  getCompanyJobs,
  updateCompanyInfo,
  updateCompanyPicture,
  refresh,
  logout,
};
