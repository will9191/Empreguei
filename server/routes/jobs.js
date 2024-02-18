const express = require('express');
const router = express.Router();

const {
  newJob,
  getJobs,

  getJobDetails,
  updateJob,
  deleteJob,
  applyForJob,
  unapplyForJob,
} = require('../controllers/job.controller');

router.get('/search', getJobs);
router.post('/new', newJob);
router.get('/:id', getJobDetails);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
