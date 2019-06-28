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
