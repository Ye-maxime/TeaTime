const server = require('../server')

async function findAllLuluMenu (ctx) {
  const drinks = await server.pool.query("select * from lulumenu")
  ctx.body = drinks.rows
}

module.exports = {
  findAllLuluMenu
}
