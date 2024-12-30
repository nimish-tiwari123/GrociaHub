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

module.exports = { createCategory };
