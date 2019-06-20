const server = require('../server')

async function findAll (ctx) {
  const drinks = await server.pool.query("select * from drink")
  ctx.body = drinks.rows
}

async function create (ctx) {
  const result = await server.pool.query('insert into drink (name, price) values (\'' + ctx.request.body.name + '\', 12 )')
  //return the last record
  const drinks = await server.pool.query("select * from drink order by id desc limit 1")
  ctx.body = drinks.rows[0]
}

// async function destroy (ctx) {
//   // Get id from url parameters and find Todo in database
//   const id = ctx.params.id
//   const todo = await Todo.findById(id)
//
//   // Delete todo from database and return deleted object as reference
//   const deletedTodo = await todo.remove()
//   ctx.body = deletedTodo
// }
//
// async function update (ctx) {
//   // Find Todo based on id, then toggle done on/off
//   const id = ctx.params.id
//   const todo = await Todo.findById(id)
//   todo.done = !todo.done
//
//   // Update todo in database
//   const updatedTodo = await todo.save()
//   ctx.body = updatedTodo
// }

module.exports = {
  findAll,
  create
}
