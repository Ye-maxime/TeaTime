const server = require('../server')

async function findAll (ctx) {
  const drinks = await server.pool.query("select * from drink")
  ctx.body = drinks.rows
}

module.exports = {
  findAll
}
