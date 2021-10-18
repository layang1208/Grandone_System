const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtPrivateKey") || "test";

module.exports = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied. No token provided");
    // check if it is google auth
    const isCustomAuth = token.length < 500;

    if (isCustomAuth) {
      const decoded = jwt.verify(token, secret);
      req.userId = decoded.id;
    } else {
      const decoded = jwt.decode(token);
      req.userId = decoded.sub;
    }

    next();
  } catch (error) {
    // return res.status(400).send("Invalid token");
    console.log(error);
  }
};
