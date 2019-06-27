const Sequelize = require('sequelize')
const database = require('../config/database')

const DrinkOrder = database.define('drinkOrder', {
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    drinkId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'drink',
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  })

DrinkOrder.sync({force: false})
  .then(() => console.log("create DrinkOrder table in db successfully!!"))
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = DrinkOrder
