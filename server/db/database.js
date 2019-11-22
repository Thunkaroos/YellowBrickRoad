const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const chalk = require('chalk');

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`,
  {
    logging: false // unless you like the logs
    // ...and there are many other options you may want to play with
  }
);

module.exports = db;
