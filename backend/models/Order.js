const Sequelize = require('sequelize')
const database = require('../config/database')
const Drink = require('../models/Drink')

const Order = database.define('order', {
    uuid: {type: Sequelize.UUID, allowNull: false, unique: true, defaultValue: Sequelize.UUIDV1},
    total: {type: Sequelize.DECIMAL, allowNull: false}
  },
  {
    freezeTableName: true,
  })

Order.associate = () => {
  Order.belongsToMany(Drink, {
    through: 'DrinkOrder',
    // as: 'drink',
    foreignKey: 'orderId'
  })
}

Order.sync({force: false})
  .then(() => console.log("create Order table in db successfully!!"))
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = Order
