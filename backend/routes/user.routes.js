const express = require("express");
const { userControllers } = require("../controllers");

const router = express.Router();

router.get("/", userControllers.getUsers);
router.post("/", userControllers.createUser);
router.patch("/:id", userControllers.updateUser);
router.post("/login", userControllers.loginUser);
router.post("/forgot-password", userControllers.forgotPassword);
router.post("/reset-password", userControllers.resetPassword);

module.exports = router;
