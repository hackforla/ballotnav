'use strict'

const fs = require('fs')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('@config')[env]

const sequelize = new Sequelize({
  ...config,
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})

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
