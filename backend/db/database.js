const { Sequelize } = require('sequelize');

module.exports = new Sequelize('main', 'ballotnav', 'pgpass', {
    host: 'localhost',
    dialect: 'postgres'
  });