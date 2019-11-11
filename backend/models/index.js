const Sequelize = require('sequelize')
const database = require('../config/database')
const DrinkModel = require('./Drink')
const OrderModel = require('./Order')
const StoreModel = require('./Store')
const DrinkOrderModel = require('./DrinkOrder')
const AccountModel = require('./Account')


//create models
const Drink = DrinkModel(database, Sequelize)
const Order = OrderModel(database, Sequelize)
const Store = StoreModel(database, Sequelize)
const DrinkOrder = DrinkOrderModel(database, Sequelize)
const Account = AccountModel(database, Sequelize)


//associate relation many to many between table drink and order
Drink.belongsToMany(Order, {
  through: DrinkOrder,
})

Order.belongsToMany(Drink, {
  through: DrinkOrder,
})

//associate relation one to many between table account and order
Account.hasMany(Order, { as: 'Orders' })

// synchonization the database with models
//mettre en commentaire ce block quand lance test
database.sync({ force: true })
  .then(() => {
    console.log("create all tables in db successfully!!")
    initStore()
    initDrink()
  })



function initStore() {
  Store.bulkCreate([
    {
      name: 'Teatime Opéra',
      address: '55 rue des Petits Champs 75001 Paris',
      telephone: '07 16 25 36 40',
      openTime: 'Monday - Sunday 12h00 - 22h30',
      latitude: 48.867361,
      longitude: 2.334740
    }, {
      name: 'Teatime Haussmann',
      address: '13 Boulevard Haussmann 75009 Paris',
      telephone: '07 55 85 36 70',
      openTime: 'Monday - Friday 10h00 - 19h30',
      latitude: 48.876215,
      longitude: 2.335634
    }])
}

function initDrink() {
  Drink.bulkCreate([
    {
      name: 'Brown Sugar Deerioca Fresh Milk',
      price: 12,
      collection: 'BROWN',
      image: 'brown_sugar_deerioca_fresh.png'
    }, {
      name: 'Cocoa Brown Sugar Deerioca Milk ',
      price: 15,
      collection: 'BROWN',
      image: 'cocoa_brown_sugar_deerioca.png'
    },
    {
      name: 'Matcha Brown Sugar Deerioca Milk',
      price: 10,
      collection: 'BROWN',
      image: 'matcha_sugar_deerioca.png'
    },
    {
      name: 'Crème Brûlée Deerioca Milk ',
      price: 8,
      collection: 'BROWN',
      image: 'creme_brulee_deerioca.png'
    },
    {
      name: 'Snow Strawberry Lulu (Daily limited) ',
      price: 11,
      collection: 'LULU',
      image: 'snow_strawberry_lulu.png'
    }, {
      name: 'Orange Lulu ',
      price: 16,
      collection: 'LULU',
      image: 'orange_lulu.png'
    }])
}

module.exports = {
  Drink,
  Order,
  Store,
  Account,
  // DrinkOrder
  initStore,
  initDrink
}


