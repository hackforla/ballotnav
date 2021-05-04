const fs = require('fs')
const path = require('path')
const sequelize = require('./sequelize')
const Sequelize = require('sequelize')

// instantiate models
const db = fs
  .readdirSync(`${__dirname}/models`)
  .map((file) => file.replace('.js', ''))
  .reduce((models, modelName) => {
    const model = require(`./models/${modelName}`)(
      sequelize,
      Sequelize.DataTypes
    )
    models[model.name] = model
    return models
  }, {})

// build associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// add useful things
db.sequelize = sequelize
db.Sequelize = Sequelize
db.connect = require('./connect')
db.migrate = require('./migrate')

module.exports = db
