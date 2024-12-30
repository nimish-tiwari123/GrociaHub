const { Category } = require("../models");

const saveCategory = async (payload) => {
  try {
    const category = new Category(payload);
    return await category.save();
  } catch (error) {
    throw new Error("Error while saving category");
  }
};

const getCategories = async () => {
  try {
    const categories = await Category.find({});
    return categories;
  } catch (error) {
    throw new Error("Error while fetching categories");
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await Category.find({ _id: id });
    return category;
  } catch (error) {
    throw new Error("Error while fetching category");
  }
};

const getCategoryByName = async (name) => {
  try {
    const category = await Category.findOne({ name });
    return category;
  } catch (error) {
    throw new Error("Error while fetching category");
  }
};

module.exports = {
  saveCategory,
  getCategoryById,
  getCategories,
  getCategoryByName,
};
