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
    const { search, pageSize = 10, pageNo = 0 } = queries;
    const limitValue = parseInt(pageSize);
    const offsetValue = parseInt(pageNo) * limitValue;

    let totalProducts;
    if (search) {
      const searchTerm = search.trim();
      totalProducts = await Product.countDocuments({
        name: { $regex: searchTerm, $options: "i" },
      });
    } else {
      totalProducts = await Product.countDocuments({});
    }

    let products;
    if (search) {
      const searchTerm = search.trim();
      products = await Product.find({
        name: { $regex: searchTerm, $options: "i" },
      })
        .skip(offsetValue)
        .limit(limitValue)
        .populate("category");
    } else {
      products = await Product.find({})
        .skip(offsetValue)
        .limit(limitValue)
        .populate("category");
    }

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
