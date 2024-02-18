const express = require('express');
const router = express.Router();
const {
  newCurriculum,
  updateCurriculum,
} = require('../controllers/curriculum-controller');

router.post('/new', newCurriculum);
router.put('/update/:id', updateCurriculum);

module.exports = router;
