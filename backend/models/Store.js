const Sequelize = require('sequelize')
const database = require('../config/database')

const Store = database.define('store', {
    //pas besoin de id !!! (sequelize le crée automatiquement)
    name: {type: Sequelize.STRING, allowNull: false},
    address: {type: Sequelize.STRING, allowNull: false},
    telephone: {type: Sequelize.STRING, allowNull: false},
    openTime: {type: Sequelize.STRING, allowNull: false},
    mapLink: {type: Sequelize.STRING, allowNull: true},
    imagePath: {type: Sequelize.STRING, allowNull: true},
  },
  {
    timestamps: false,
    freezeTableName: true,
  })


Store.sync({force: true}) //覆盖若已有的table
  .then(() => {
    console.log("create Store table in db successfully!!")
    //批量插入
    Store.bulkCreate([{
      name: 'Teatime Opéra',
      address: '55 rue des Petits Champs 75001 Paris',
      telephone: '07 16 25 36 40',
      openTime: 'Monday - Sunday 12h00 - 22h30',
      mapLink: 'https://www.google.com/maps/place/55+Rue+des+Petits+Champs,+75001+Paris/@48.8672005,2.332562,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e3aa53f2723:0xc4a52b6226b73bd9!8m2!3d48.8672005!4d2.3347507',
      imagePath: '../assets/teatime_opera.png'
    }, {
      name: 'Teatime Haussmann',
      address: '13 Boulevard Haussmann 75009 Paris',
      telephone: '07 55 85 36 70',
      openTime: 'Monday - Friday 10h00 - 19h30',
      mapLink: 'https://www.google.com/maps/place/13+Boulevard+Haussmann,+75009+Paris/@48.8724175,2.3333617,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e39e91dfc61:0x7d044a484552d631!8m2!3d48.8724175!4d2.3355504',
      imagePath: '../assets/teatime_haussmann.png'
    }])
  })
  .catch(error => console.log("error creating table in db!!" + error))

module.exports = Store
