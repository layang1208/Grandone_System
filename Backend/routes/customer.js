const express = require("express");
const { validate } = require("../middleware/validator");
const { Customer } = require("../models/customer");
const { customerSchema } = require("../validation/customer");
const router = express.Router();
const _ = require("lodash");

router.post("/", validate(customerSchema), async (req, res) => {
  let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("You have already subscribed");

  customer = new Customer(_.pick(req.body, ["email"]));
  await customer.save();
});

module.exports = router;
