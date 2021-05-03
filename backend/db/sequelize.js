const Sequelize = require('sequelize')
const config = require('./config/connect')

const sequelize = new Sequelize(config)

module.exports = sequelize
