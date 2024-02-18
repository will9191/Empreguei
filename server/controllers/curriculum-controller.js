const Curriculum = require('../models/curriculumSchema');

const newCurriculum = async (req, res) => {
  try {
    const curriculum = new Curriculum({
      ...req.body,
    });

    const duplicate = await Curriculum.findOne({
      createdBy: req.body.createdBy,
    });
    if (duplicate) {
      return res.status(409).json({ message: 'Duplicate Curriculum' });
    } else {
      let result = await curriculum.save();

      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCurriculum = async (req, res) => {
  try {
    let result = await Curriculum.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newCurriculum,
  updateCurriculum,
};
