const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },

});

const Contact = mongoose.model("Contact", contactSchema);

exports.Contact = Contact;
