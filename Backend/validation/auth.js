const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().min(5).max(255).required(),
});

module.exports = {
  authSchema,
};
