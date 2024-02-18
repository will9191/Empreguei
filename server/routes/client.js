const express = require('express');
const router = express.Router();

const {
  clientRegister,
  clientLogIn,
  getClients,
  getClientDetails,
  updateClientPicture,
  updateClientInfo,
  apply,
  unapply,
} = require('../controllers/client-controller');

const upload = require('../config/multer');

router.post('/login', clientLogIn);
router.post('/register', clientRegister);
router.get('/search', getClients);
router.get('/details/:id', getClientDetails);
router.put('/updatePhoto/:id', upload, updateClientPicture);
router.put('/updateInfo/:id', updateClientInfo);
router.post('/apply', apply);
router.post('/unapply', unapply);

module.exports = router;
