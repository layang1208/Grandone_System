function validate(schema) {
  return (req, res, next) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };

    const { error } = schema.validate(req.body, options);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
}

module.exports = {
  validate: validate,
};
