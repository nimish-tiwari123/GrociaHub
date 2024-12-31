const { responseMessages } = require("../configs");
const { categoryServices } = require("../services");
const { cloudinaryUtils } = require("../utils");
const { categoryValidations } = require("../validations");

const createCategory = async (req, res) => {
  try {
    const { error } = categoryValidations.createValidation.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: false, message: error.details[0].message });
    }

    const categoryExists = await categoryServices.getCategoryByName(
      req.body.name
    );

    if (categoryExists) {
      return res.status(409).json({
        status: false,
        message: responseMessages.CATEGORY_ALREADY_EXISTS,
      });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "Image is a required field" });
    }

    const image = req.file.path;

    const imageUrl = await cloudinaryUtils.upload(
      image,
      "grociaHub/categories"
    );

    const newCategory = {
      ...req.body,
      image: imageUrl,
    };

    const createdCategory = await categoryServices.saveCategory(newCategory);

    return res
      .status(201)
      .json({ status: true, message: responseMessages.CATEGORY_CREATED });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

const getCategories = async (req, res) => {
  try {
    const queries = {
      search: req.query.search || "",
    };

    const categories = await categoryServices.getCategories(queries);

    return res.status(200).json({
      status: true,
      message: responseMessages.CATEGORIES_RETRIEVED,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryServices.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: responseMessages.CATEGORY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: true,
      message: responseMessages.CATEGORY_RETRIEVED,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await categoryServices.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: false,
        message: responseMessages.CATEGORY_NOT_FOUND,
      });
    }

    await cloudinaryUtils.deleteOnCloudinary(
      category.image,
      "grociaHub/categories"
    );

    await categoryServices.deleteCategoryById(req.params.id);

    return res.status(200).json({
      status: true,
      message: responseMessages.CATEGORY_DELETED,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: responseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryExists = await categoryServices.getCategoryById(id);

    if (!categoryExists) {
      return res.status(404).json({
        status: false,
        message: responseMessages.CATEGORY_NOT_FOUND,
      });
    }

    const { name } = req.body;
    const image = req.file;

    if (req.file) {
      await cloudinaryUtils.deleteOnCloudinary(
        categoryExists.image,
        "grociaHub/categories"
      );
      const imageUrl = await cloudinaryUtils.upload(
        image.path,
        "grociaHub/categories"
      );
      req.body.image = imageUrl;
    }

    const updatedCategory = {
      name,
      image: req.body.image,
    };

    await categoryServices.updateCategory(id, updatedCategory);

    return res
      .status(200)
      .json({ status: true, message: responseMessages.CATEGORY_UPDATED });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
