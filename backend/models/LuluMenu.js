const Sequelize = require('sequelize')
const database = require('../config/database')

const LuluMenu = database.define('lulumenu', {
    //pas besoin de id !!! (sequelize le crée automatiquement)
    name: {type: Sequelize.STRING, allowNull: false},
    price: {type: Sequelize.DECIMAL, allowNull: false}
  },
  {
    timestamps: false,
    freezeTableName: true,
  })

LuluMenu.sync({force: false})
  .then(() => console.log("create luluMenus table in db successfully!!"))
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = LuluMenu
