const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/users");
const { validate } = require("../middleware/validator");
const { userSchema } = require("../validation/user");

router.get("/me", async (req, res) => {});
// create new users
router.post("/", validate(userSchema), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exist");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["username", "email"]));
});

module.exports = router;
