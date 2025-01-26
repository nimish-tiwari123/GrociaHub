const { User, Product, Category } = require("../models");

const getCounts = async () => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const categoriesCount = await Category.countDocuments();

    return {
      usersCount,
      productsCount,
      categoriesCount,
    };
  } catch (error) {
    throw new Error("Error while fetching counts");
  }
};

module.exports = { getCounts };
