const { Store } = require('../models/index')

async function findAll(ctx) {
    const stores = await Store.findAll({
        raw: true, // raw: true => get only dataValues from Sequelize ORM
    })
    ctx.set('Cache-Control', 'public, max-age=3600');
    ctx.body = stores
}

module.exports = {
    findAll,
}
