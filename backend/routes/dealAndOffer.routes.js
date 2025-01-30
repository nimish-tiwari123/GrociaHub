const express = require("express");
const { dealsAndOfferControllers } = require("../controllers");

const router = express.Router();

router.post("/", dealsAndOfferControllers.createDealsAndOffer);
router.get("/", dealsAndOfferControllers.getDealsAndOffers);
router.get("/:id", dealsAndOfferControllers.getDealsAndOffer);
router.patch("/:id", dealsAndOfferControllers.updateDealsAndOffer);
router.delete("/:id", dealsAndOfferControllers.deleteDealsAndOffer);

module.exports = router;
