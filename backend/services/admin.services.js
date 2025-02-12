const { User, Product, Order, DealsAndOffer } = require("../models");

const getCounts = async () => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const dealsAndOfferCount = await DealsAndOffer.countDocuments();

    return {
      usersCount,
      productsCount,
      ordersCount,
      dealsAndOfferCount,
    };
  } catch (error) {
    throw new Error("Error while fetching counts");
  }
};

module.exports = { getCounts };
