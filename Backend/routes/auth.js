const express = require("express");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { validate } = require("../middleware/validator");
const { authSchema } = require("../validation/auth");

router.post("/", validate(authSchema), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password" });
    const token = user.generateAuthToken();
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
