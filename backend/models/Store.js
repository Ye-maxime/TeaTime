const Sequelize = require('sequelize')
const database = require('../config/database')

const Store = database.define('store', {
    //pas besoin de id !!! (sequelize le crée automatiquement)
    name: {type: Sequelize.STRING, allowNull: false},
    address: {type: Sequelize.STRING, allowNull: false},
    telephone: {type: Sequelize.STRING, allowNull: false},
    openTime: {type: Sequelize.STRING, allowNull: false}
  },
  {
    timestamps: false,
    freezeTableName: true,
  })

Store.sync({force: false})
  .then(() => {
    console.log("create Store table in db successfully!!")
    Store.create({
      name: 'Teatime Opéra',
      address: '55 rue des Petits Champs 75001 Paris',
      telephone: '07 16 25 36 40',
      openTime: 'Monday - Sunday 12h00 - 22h30'
    }).then( () => {
      Store.create({
        name: 'Teatime Bécon',
        address: '10 rue des Sablière 92400 Courbevoie',
        telephone: '07 55 85 36 70',
        openTime: 'Monday - Friday 10h00 - 19h30'
      })
    })
  })
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = Store
