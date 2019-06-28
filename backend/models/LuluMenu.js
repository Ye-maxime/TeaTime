module.exports = (database, Sequelize) => {
  return database.define('lulumenu', {
      name: {type: Sequelize.STRING, allowNull: false},
      price: {type: Sequelize.DECIMAL, allowNull: false}
    },
    {
      timestamps: false,
      freezeTableName: true,
    })
}
