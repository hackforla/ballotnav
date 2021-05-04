const Sequelize = require('sequelize')
const config = require('./config/connect')

console.log('db config:', config)

const sequelize = new Sequelize(config)

module.exports = sequelize
