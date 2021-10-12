const mongoose = require("mongoose");
const config = require("config");

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
