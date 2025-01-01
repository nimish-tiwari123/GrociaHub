const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be an empty field",
    "any.required": "Name is a required field",
  }),
  category: Joi.string().required().messages({
    "string.base": "Category should be a type of text",
    "string.empty": "Category cannot be an empty field",
    "any.required": "Category is a required field",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description cannot be an empty field",
    "any.required": "Description is a required field",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price should be a type of number",
    "number.empty": "Price cannot be an empty field",
    "any.required": "Price is a required field",
  }),
  quantity: Joi.number().required().messages({
    "number.base": "Quantity should be a type of number",
    "number.empty": "Quantity cannot be an empty field",
    "number.required": "Quantity is a required field",
  }),
  discount: Joi.number().optional().messages({
    "number.base": "Discount should be a type of number",
    "number.empty": "Discount cannot be an empty field",
  }),
});

module.exports = { createValidation };
