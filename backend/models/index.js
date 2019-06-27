const Sequelize = require('sequelize')
const database = require('../config/database')
const DrinkModel = require('./Drink')
const OrderModel = require('./Order')
const StoreModel = require('./Store')
const DrinkOrderModel = require('./DrinkOrder')


//create models
const Drink = DrinkModel(database, Sequelize)
const Order = OrderModel(database, Sequelize)
const Store = StoreModel(database, Sequelize)
const DrinkOrder = DrinkOrderModel(database, Sequelize)

Drink.belongsToMany(Order, {
  through: DrinkOrder,
})

Order.belongsToMany(Drink, {
  through: DrinkOrder,
})

database.sync({force: false}).then(() => console.log("create all tables in db successfully!!"))

module.exports = {
  Drink,
  Order,
  Store,
  // DrinkOrder
}


