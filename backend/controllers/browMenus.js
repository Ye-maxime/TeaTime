const server = require('../server')

async function findAllBrowMenu (ctx) {
  const drinks = await server.pool.query("select * from browmenu")
  ctx.body = drinks.rows
}

module.exports = {
  findAllBrowMenu
}
