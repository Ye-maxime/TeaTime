const moment = require('moment')
module.exports = (database, Sequelize) => {
  return database.define('order', {
      uuid: {type: Sequelize.UUID, allowNull: false, unique: true, defaultValue: Sequelize.UUIDV1},
      total: {type: Sequelize.DECIMAL, allowNull: false},
      createdAt: {
        type: Sequelize.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    {
      freezeTableName: true,
    })
}

// Order.associate = () => {
//   Order.belongsToMany(Drink, {
//     through: 'DrinkOrder',
//     // as: 'drink',
//     foreignKey: 'orderId'
//   })
// }
//
// Order.sync({force: false})
//   .then(() => console.log("create Order table in db successfully!!"))
//   .catch(error => console.log("error creating table in db!!" + error))

// module.exports = Order
