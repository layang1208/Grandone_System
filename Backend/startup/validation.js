// to validate object id

const Joi = require("joi");
module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
