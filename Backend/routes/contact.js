const express = require("express");
const { validate } = require("../middleware/validator");
const { Contact } = require("../models/contact");
const { contactSchema } = require("../validation/contact");
const router = express.Router();
const _ = require("lodash");

router.post("/", validate(contactSchema), async (req, res) => {
  contact = new Contact(_.pick(req.body, ["name", "email", "message"]));
  await contact.save();
});

module.exports = router;
