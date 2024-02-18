const express = require('express');
const router = express.Router();

const {
  adminRegister,
  adminLogIn,
  getAdminDetail,
  updateAdminPicture,
  getAdmins,
} = require('../controllers/admin-controller');

const upload = require('../config/multer');

router.post('/login', adminLogIn);
router.post('/register', adminRegister);
router.put('/updatePhoto/:id', upload, updateAdminPicture);
router.get('/Admin/:id', getAdminDetail);
router.get('/all', getAdmins);

module.exports = router;
