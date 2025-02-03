const { userControllers } = require("../controllers");
const { multerMiddleware } = require("../middlewares");
const express = require("express");

const router = express.Router();

router.get("/", userControllers.getUsers);
router.post("/", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.post("/reset-password", userControllers.resetPassword);
router.post("/forgot-password", userControllers.forgotPassword);
router.patch(
  "/:id",
  multerMiddleware.upload.single("image"),
  userControllers.updateUser
);

module.exports = router;
