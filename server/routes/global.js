const express = require("express");
const router = express.Router();

const { companyLogIn } = require("../controllers/company-controller");
const { adminLogIn } = require("../controllers/admin-controller");
const { clientLogIn } = require("../controllers/client-controller");

router.post("/", (companyLogIn, adminLogIn, clientLogIn));

module.exports = router
