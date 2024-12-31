const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be an empty field",
  }),
  category: Joi.string().optional().messages({
    "string.base": "Category should be a type of text",
    "string.empty": "Category cannot be an empty field",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description cannot be an empty field",
  }),
  price: Joi.number().optional().messages({
    "number.base": "Price should be a type of number",
    "number.empty": "Price cannot be an empty field",
  }),
  discount: Joi.number().optional().messages({
    "number.base": "Discount should be a type of number",
    "number.empty": "Discount cannot be an empty field",
  }),
});

module.exports = { createValidation };
