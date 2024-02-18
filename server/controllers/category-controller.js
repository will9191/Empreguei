const Category = require('../models/categorySchema');
const Job = require('../models/jobSchema');
const cloudinary = require('../config/cloudinary');

const newCategory = async (req, res) => {
  try {
    const category = new Category({
      ...req.body,
    });

    const duplicate = await Category.findOne({
      name: req.body.name,
    });

    if (duplicate) {
      return res.status(409).json({ message: 'Duplicate Category' });
    } else {
      let result = await category.save();

      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.json({ categories });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCategoryDetails = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    const jobs = await Job.find({ category: req.params.id }).populate(
      'company',
      '_id name picture'
    );

    res.send({ category, jobs });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCategoryPicture = async (req, res) => {
  const category = req.params.id;
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${category}_profile`,
      width: 500,
      height: 500,
      crop: 'fill',
    });

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { picture: result.url },
      { new: true }
    );
    res.send(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  newCategory,
  getCategories,
  getCategoryDetails,
  updateCategoryPicture,
};
