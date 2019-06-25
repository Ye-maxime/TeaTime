const Sequelize = require('sequelize')
const database = require('../config/database')

const Drink = database.define('drink', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    price: {type: Sequelize.DECIMAL, allowNull: false}
  },
  {
    timestamps: false,
    freezeTableName: true,
  })

Drink.sync({force: false})
  .then(() => console.log("create Drink table in db successfully!!"))
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = Drink
