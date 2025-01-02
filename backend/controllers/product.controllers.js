const { responseMessages } = require("../configs");
const { productServices } = require("../services");
const { cloudinaryUtils } = require("../utils");
const { productValidations } = require("../validations");

const createProduct = async (req, res) => {
  try {
    const { error } = productValidations.createValidation.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }

    const productExists = await productServices.getProductByName(req.body.name);

    if (productExists) {
      return res.status(409).json({
        status: false,
        message: responseMessages.PRODUCT_ALREADY_EXISTS,
      });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "At least one image is required" });
    }

    const imageUrls = await Promise.all(
      req.files.map((file) =>
        cloudinaryUtils.upload(file.path, "grociaHub/products")
      )
    );

    const newProduct = {
      ...req.body,
      images: imageUrls,
    };

    const createdProduct = await productServices.saveProduct(newProduct);

    return res
      .status(201)
      .json({ status: true, message: responseMessages.PRODUCT_CREATED });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

const getProducts = async (req, res) => {
  try {
    const queries = {
      search: req.query.search || "",
    };

    const products = await productServices.getProducts(queries);

    return res.status(200).json({
      status: true,
      message: responseMessages.PRODUCTS_RETRIEVED,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productServices.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: responseMessages.PRODUCT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: true,
      message: responseMessages.PRODUCT_RETRIEVED,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productServices.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: responseMessages.PRODUCT_NOT_FOUND,
      });
    }

    await Promise.all(
      product.images.map((image) =>
        cloudinaryUtils.deleteOnCloudinary(image, "grociaHub/products")
      )
    );

    await productServices.deleteProductById(req.params.id);

    return res.status(200).json({
      status: true,
      message: responseMessages.PRODUCT_DELETED,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productExists = await productServices.getProductById(id);

    if (!productExists) {
      return res.status(404).json({
        status: false,
        message: responseMessages.PRODUCT_NOT_FOUND,
      });
    }

    await productServices.updateProduct(id, req.body);

    return res
      .status(200)
      .json({ status: true, message: responseMessages.PRODUCT_UPDATED });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
