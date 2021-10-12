const express = require("express");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { validate } = require("../middleware/validator");
const { authSchema } = require("../validation/auth");

router.post("/", validate(authSchema), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
