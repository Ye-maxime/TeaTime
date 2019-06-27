const BrowMenus = require('../models/BrowMenu')

async function findAll(ctx) {
  const browMenus = await BrowMenus.findAll()
  ctx.body = browMenus
}

module.exports = {
  findAll
}
