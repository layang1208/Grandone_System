const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/users");
const { validate } = require("../middleware/validator");
const { userSchema } = require("../validation/user");
const jwt = require("jsonwebtoken");
router.get("/me", async (req, res) => {});

// create new users
router.post("/", validate(userSchema), async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match" });

    const newUser = new User({
      name: firstname + lastname,
      email: email, 
      password: password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    const result = await newUser.save();
    console.log(result);
    const token = newUser.generateAuthToken();
    res
      .status(201)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

module.exports = router;
