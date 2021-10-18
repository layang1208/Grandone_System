const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().min(2).max(50).required(),
  lastname: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(5).max(255).required(),
  email: Joi.string().email().min(5).max(255).required(),
});

module.exports = {
  userSchema,
};
