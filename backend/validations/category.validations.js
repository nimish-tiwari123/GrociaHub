const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be an empty field",
    "any.required": "Name is a required field",
  }),
});

module.exports = { createValidation };
