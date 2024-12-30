const express = require("express");
const { categoryControllers } = require("../controllers");
const { multerMiddleware } = require("../middlewares");

const router = express.Router();

router.post(
  "/",
  multerMiddleware.upload.single("image"),
  categoryControllers.createCategory
);
router.get("/", categoryControllers.getCategories);
router.get("/:id", categoryControllers.getCategoryById);
router.delete("/:id", categoryControllers.deleteCategory);
router.patch("/:id", categoryControllers.updateCategory);

module.exports = router;
