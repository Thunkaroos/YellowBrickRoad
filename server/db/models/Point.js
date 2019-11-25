const Sequelize = require("sequelize");
const db = require("../database");

const Point = db.define("point", {
  stepNum: {
    type: Sequelize.INTEGER
  },
  x: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  y: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  z: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
});

module.exports = Point;
