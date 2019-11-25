const Sequelize = require("sequelize");
const db = require("../database");
const _ = require("lodash");

const Tour = db.define(
    "tour",
    {
      tour_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
    },
      description: {
        type: Sequelize.TEXT
    },
      startImg: {
        type: Sequelize.STRING
    }
}
)


module.exports = Tour;