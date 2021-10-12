const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleRejections: true,
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@grandonedb.ac5hf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      level: "info",
    })
  );
};
