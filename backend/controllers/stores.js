const Store = require('../models/Store')

async function findAll(ctx) {
  const stores = await Store.findAll()
  ctx.body = stores
}

module.exports = {
  findAll
}
