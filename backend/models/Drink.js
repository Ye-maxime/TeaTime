module.exports = (database, Sequelize) => database.define('drink', {
    // pas besoin de id !!! (sequelize le crée automatiquement)
    name: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.DECIMAL, allowNull: false },
    collection: { type: Sequelize.ENUM, values: ['LULU', 'BROWN'], allowNull: false },
    image: { type: Sequelize.STRING, allowNull: true },
    stock: { type: Sequelize.INTEGER, allowNull: false },
},
{
    timestamps: false,
    freezeTableName: true,
})
