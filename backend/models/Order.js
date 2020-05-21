const moment = require('moment')
module.exports = (database, Sequelize) => {
    return database.define('order', {
        uuid: { type: Sequelize.UUID, allowNull: false, unique: true, defaultValue: Sequelize.UUIDV1 },
        total: { type: Sequelize.DECIMAL, allowNull: false },
        accountId: { //外键
            type: Sequelize.INTEGER,
            references: {
                model: 'account', // account 表
                key: 'id' // account 表里的id列
            }
        },
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
