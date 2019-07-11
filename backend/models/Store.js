module.exports = (database, Sequelize) => {
  return database.define('store', {
      //pas besoin de id !!! (sequelize le crée automatiquement)
      name: {type: Sequelize.STRING, allowNull: false},
      address: {type: Sequelize.STRING, allowNull: false},
      telephone: {type: Sequelize.STRING, allowNull: false},
      openTime: {type: Sequelize.STRING, allowNull: false},
      latitude: {type: Sequelize.FLOAT, allowNull: true},
      longitude: {type: Sequelize.FLOAT, allowNull: true}
    },
    {
      timestamps: false,
      freezeTableName: true,
    })
}
