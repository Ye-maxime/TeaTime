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


//associate relation many to many between table drink and order
Drink.belongsToMany(Order, {
  through: DrinkOrder,
})

Order.belongsToMany(Drink, {
  through: DrinkOrder,
})


//synchonization the database with models
database.sync({force: true})
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
      mapLink: 'https://www.google.com/maps/place/55+Rue+des+Petits+Champs,+75001+Paris/@48.8672005,2.332562,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e3aa53f2723:0xc4a52b6226b73bd9!8m2!3d48.8672005!4d2.3347507',
      imagePath: '../assets/teatime_opera.png',
      latitude: 48.867361,
      longitude: 2.334740
    }, {
      name: 'Teatime Haussmann',
      address: '13 Boulevard Haussmann 75009 Paris',
      telephone: '07 55 85 36 70',
      openTime: 'Monday - Friday 10h00 - 19h30',
      mapLink: 'https://www.google.com/maps/place/13+Boulevard+Haussmann,+75009+Paris/@48.8724175,2.3333617,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e39e91dfc61:0x7d044a484552d631!8m2!3d48.8724175!4d2.3355504',
      imagePath: '../assets/teatime_haussmann.png',
      latitude: 48.876215,
      longitude: 2.335634
    }])
}

function initDrink() {
  Drink.bulkCreate([
    {
      name: 'Brown Sugar Deerioca Fresh Milk',
      price: 12,
      collection: 'BROWN'
    }, {
      name: 'Cocoa Brown Sugar Deerioca Milk ',
      price: 15,
      collection: 'BROWN'
    },
    {
      name: 'Matcha Brown Sugar Deerioca Milk',
      price: 10,
      collection: 'BROWN'
    },
    {
      name: 'Crème Brûlée Deerioca Milk ',
      price: 8,
      collection: 'BROWN'
    },
    {
      name: 'Snow Strawberry Lulu (Daily limited) ',
      price: 11,
      collection: 'LULU'
    }, {
      name: 'Orange Lulu ',
      price: 16,
      collection: 'LULU'
    }])
}

module.exports = {
  Drink,
  Order,
  Store,
  // DrinkOrder
}


