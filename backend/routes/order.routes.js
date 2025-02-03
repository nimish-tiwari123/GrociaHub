const { orderControllers } = require("../controllers");
const express = require("express");

const router = express.Router();

router.post("/", orderControllers.createOrder);
router.get("/", orderControllers.getOrders);
router.get("/:id", orderControllers.getOrderById);
router.patch("/:id", orderControllers.updateOrder);
router.delete("/:id", orderControllers.deleteOrder);

module.exports = router;
