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
  .then(() => {
    console.log("create luluMenus table in db successfully!!")
    LuluMenu.bulkCreate([{
      name: 'Snow Strawberry Lulu (Daily limited) ',
      price: 12
    }, {
      name: 'Orange Lulu ',
      price: 12
    }])
  })
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = LuluMenu
