const userControllers = require("./user.controllers");
const categoryControllers = require("./category.controllers");
const productControllers = require("./product.controllers");
const adminControllers = require("./admin.controllers");
const dealsAndOfferControllers = require("./dealsAndOffer.controllers");

module.exports = {
  dealsAndOfferControllers,
  userControllers,
  categoryControllers,
  productControllers,
  adminControllers,
};
