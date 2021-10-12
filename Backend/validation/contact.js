const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(255).required(),
  message: Joi.string().email().min(5).max(255).required(),
});

module.exports = {
  contactSchema,
};
