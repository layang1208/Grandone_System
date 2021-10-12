const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const customer = require("../routes/customer");
const contact = require("../routes/contact");
const posts = require("../routes/post");
const error = require("../middleware/error");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/posts", posts);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/customer", customer);
  app.use("/api/contact", contact);
  app.use(error);
};
