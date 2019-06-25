const server = require('../server')

async function findAllBrowMenus (ctx) {
  const browMenus = await server.pool.query("select * from browmenu")
  ctx.body = browMenus.rows
}

module.exports = {
  findAllBrowMenus
}
