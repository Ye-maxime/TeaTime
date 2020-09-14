module.exports = (database, Sequelize) => database.define('drinkOrder',
    {
        quantity: { // quantity of the certain drink in the order
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    })
