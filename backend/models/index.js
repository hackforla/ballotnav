'use strict'

require('module-alias/register')

const fs = require('fs')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('@config')[env]

if (env.toLowerCase() === 'production') {
  console.log('Loading production database config')
  config.host = process.env.DB_HOSTNAME
  config.password = process.env.POSTGRES_PASSWORD
}

const sequelize = new Sequelize(config)

const db = fs
  .readdirSync(__dirname)
  .map((file) => file.replace('.js', ''))
  .filter((file) => file !== 'index')
  .reduce((models, modelName) => {
    const model = require(`./${modelName}`)(sequelize, Sequelize.DataTypes)
    models[model.name] = model
    return models
  }, {})

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
