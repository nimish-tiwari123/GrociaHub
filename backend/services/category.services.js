const { Category } = require("../models");

const saveCategory = async (payload) => {
  try {
    const category = new Category(payload);
    return await category.save();
  } catch (error) {
    throw new Error("Error while saving category");
  }
};

const updateCategory = async (payload) => {
  try {
    const category = await Category.findOneAndUpdate(payload);
    return category;
  } catch (error) {
    throw new Error("Error while saving category");
  }
};

const getCategories = async (queries) => {
  try {
    let categories;
    if (queries.search) {
      const searchTerm = queries.search.trim();
      categories = await Category.find({
        name: { $regex: searchTerm, $options: "i" },
      });
    } else {
      categories = await Category.find({});
    }
    return categories;
  } catch (error) {
    throw new Error("Error while fetching categories");
  }
};

const deleteCategoryById = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    return category;
  } catch (error) {
    throw new Error("Error while deleting category");
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await Category.findById({ _id: id });
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
  deleteCategoryById,
  updateCategory,
};
