const express = require("express");
const config = require("config");
const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// without this
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
require("./startup/cors")(app);
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");

const server = app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

module.exports = server;
