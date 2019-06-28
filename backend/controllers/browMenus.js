const  { BrowMenu } = require('../models/index')

async function findAll(ctx) {
  const browMenus = await BrowMenu.findAll()
  ctx.body = browMenus
}

module.exports = {
  findAll
}
