const Sequelize = require('sequelize')
const database = require('../config/database')
const Order = require('../models/Order')

const Drink = database.define('drink', {
    //pas besoin de id !!! (sequelize le crée automatiquement)
    name: {type: Sequelize.STRING, allowNull: false},
    price: {type: Sequelize.DECIMAL, allowNull: false}
  },
  {
    timestamps: false,
    freezeTableName: true,
  })

Drink.associate = () => {
  Drink.belongsToMany(Order, {
    through: 'DrinkOrder',
    foreignKey: 'drinkId'
  })
}

Drink.sync({force: false})
  .then(() => console.log("create Drink table in db successfully!!"))
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = Drink
