const express = require("express");
const router = express.Router();

const {
  newCategory,
  updateCategoryPicture,
  getCategories,
  getCategoryDetails,
} = require("../controllers/category-controller");

const upload = require('../config/multer');

router.post("/new", newCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryDetails);
router.put("/:id", upload, updateCategoryPicture);

module.exports = router;
