const Sequelize = require('sequelize')
const config = require('./config/connect')

console.log('DB CONFIG:', config)

const sequelize = new Sequelize(config)

module.exports = sequelize
