const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
const dotenv = require("dotenv");
dotenv.config();
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@grandonedb.ac5hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = function () {
  mongoose
    .connect(mongoString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(winston.info(`Connected to DB `));
  // .catch((err) => {
  //   console.error(err.message);
  //   process.exit(1);
  // });
};
