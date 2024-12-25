const express = require("express");
const { userControllers } = require("../controllers");

const router = express.Router();

router.post("/", userControllers.createUser);
router.post("/login", userControllers.loginUser);

module.exports = router;
