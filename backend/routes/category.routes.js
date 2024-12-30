const express = require("express");
const { categoryControllers } = require("../controllers");
const { multerMiddleware } = require("../middlewares");

const router = express.Router();

router.post(
  "/",
  multerMiddleware.upload.single("image"),
  categoryControllers.createCategory
);

module.exports = router;
