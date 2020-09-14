module.exports = (database, Sequelize) => database.define('account', {
    // pas besoin de id !!! (sequelize le crée automatiquement)
    firstname: { type: Sequelize.STRING, allowNull: false },
    lastname: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
},
{
    timestamps: false,
    freezeTableName: true,
})
