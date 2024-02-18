const express = require('express');
const router = express.Router();

const {
  companyRegister,
  getCompanies,
  updateCompanyInfo,
  updateCompanyPicture,
  getCompanyDetails,
  getCompanyJobs,
} = require('../controllers/company-controller');

const upload = require('../config/multer');

router.get('/search', getCompanies);
router.get('/jobs/:id', getCompanyJobs);
router.put('/updateInfo/:id', updateCompanyInfo);
router.put('/updatePhoto/:id', upload, updateCompanyPicture);
router.get('/:id', getCompanyDetails);
router.post('/register', companyRegister);

module.exports = router;
