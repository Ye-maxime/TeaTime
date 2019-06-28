module.exports = (database, Sequelize) => {
  return database.define('store', {
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
}
