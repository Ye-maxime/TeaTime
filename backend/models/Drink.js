module.exports = (database, Sequelize) => {
  return database.define('drink', {
      //pas besoin de id !!! (sequelize le crée automatiquement)
      name: {type: Sequelize.STRING, allowNull: false},
      price: {type: Sequelize.DECIMAL, allowNull: false}
    },
    {
      timestamps: false,
      freezeTableName: true,
    })
}
