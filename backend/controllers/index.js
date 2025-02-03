const dealsAndOfferControllers = require("./dealsAndOffer.controllers");
const categoryControllers = require("./category.controllers");
const productControllers = require("./product.controllers");
const adminControllers = require("./admin.controllers");
const orderControllers = require("./order.controllers");
const userControllers = require("./user.controllers");

module.exports = {
  dealsAndOfferControllers,
  userControllers,
  categoryControllers,
  productControllers,
  adminControllers,
  orderControllers,
};
