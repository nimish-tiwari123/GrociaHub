const { Product } = require("../models");

const saveProduct = async (payload) => {
  try {
    const product = new Product(payload);
    return await product.save();
  } catch (error) {
    throw new Error("Error while saving product");
  }
};

const updateProduct = async (id, payload) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return product;
  } catch (error) {
    throw new Error("Error while saving product");
  }
};

const getProducts = async (queries) => {
  try {
    let categories;
    if (queries.search) {
      const searchTerm = queries.search.trim();
      categories = await Product.find({
        name: { $regex: searchTerm, $options: "i" },
      });
    } else {
      categories = await Product.find({});
    }
    return categories;
  } catch (error) {
    throw new Error("Error while fetching categories");
  }
};

const deleteProductById = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    return product;
  } catch (error) {
    throw new Error("Error while deleting product");
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById({ _id: id });
    return product;
  } catch (error) {
    throw new Error("Error while fetching product");
  }
};

const getProductByName = async (name) => {
  try {
    const product = await Product.findOne({ name });
    return product;
  } catch (error) {
    throw new Error("Error while fetching product");
  }
};

module.exports = {
  saveProduct,
  getProductById,
  getProducts,
  getProductByName,
  deleteProductById,
  updateProduct,
};
