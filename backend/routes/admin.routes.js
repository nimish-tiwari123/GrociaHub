const express = require("express");
const { adminControllers } = require("../controllers");

const router = express.Router();

router.get("/dashboard-counts", adminControllers.dashboardCounts);

module.exports = router;
