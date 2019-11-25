const Sequelize = require("sequelize");
const db = require("../database");
const _ = require("lodash");

const Point = db.define(
    "point",
    {
      coordinates: {
        type: Sequelize.DECIMAL
      }
  }
)



module.exports = Point;