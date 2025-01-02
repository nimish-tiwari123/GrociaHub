const express = require("express");
const { productControllers } = require("../controllers");
const { multerMiddleware } = require("../middlewares");

const router = express.Router();

router.post(
  "/",
  multerMiddleware.upload.array("images", 3),
  productControllers.createProduct
);
router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProductById);
router.delete("/:id", productControllers.deleteProduct);
router.patch(
  "/:id",
  multerMiddleware.upload.single("images", 3),
  productControllers.updateProduct
);

module.exports = router;
