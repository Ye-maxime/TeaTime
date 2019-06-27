const Sequelize = require('sequelize')
const database = require('../config/database')

const BrowMenu = database.define('browmenu', {
    //pas besoin de id !!! (sequelize le crée automatiquement)
    name: {type: Sequelize.STRING, allowNull: false},
    price: {type: Sequelize.DECIMAL, allowNull: false}
  },
  {
    timestamps: false,
    freezeTableName: true,
  })

BrowMenu.sync({force: false})
  .then(() => console.log("create browMenus table in db successfully!!"))
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = BrowMenu
