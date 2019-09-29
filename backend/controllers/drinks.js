const { Drink } = require('../models/index')

async function findAll(ctx) {
  const drinks = await Drink.findAll({
    raw: true, // raw: true => get only dataValues from Sequelize ORM
  });
  ctx.body = drinks
}

async function create(ctx) {
  const newDrink = await Drink.create({ name: ctx.request.body.name, price: 12, collection: 'LULU' })
  ctx.body = newDrink
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
