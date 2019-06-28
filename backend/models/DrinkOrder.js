module.exports = (database, Sequelize) => {
  return database.define('drinkOrder',
    {
      quantity : { //quantity of the certain drink in the order
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    })
}
