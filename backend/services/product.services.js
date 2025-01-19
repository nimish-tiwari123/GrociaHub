const { Product } = require("../models");

const saveProduct = async (payload) => {
  try {
    console.log(payload);
    const product = new Product(payload);
    return await product.save();
  } catch (error) {
    console.log(error);
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
    const { search, pageSize = 10, pageNo = 0, category } = queries;
    const limitValue = parseInt(pageSize, 10);
    const offsetValue = parseInt(pageNo, 10) * limitValue;

    const query = {};
    if (search) {
      const searchTerm = search.trim();
      query.name = { $regex: searchTerm, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .skip(offsetValue)
      .limit(limitValue)
      .populate("category");

    const totalPages = Math.ceil(totalProducts / limitValue);
    const currentPageNo = Math.floor(offsetValue / limitValue) + 1;

    return {
      products,
      pagination: {
        pageNo: currentPageNo,
        pageSize: limitValue,
        totalPages,
        totalProducts,
      },
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching products");
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
    const product = await Product.findById({ _id: id }).populate("category");
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
