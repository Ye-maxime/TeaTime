const {Order, Drink} = require('../models/index')

async function findAll(ctx) {
  const orders = await Order.findAll()
  ctx.body = orders
}

async function create(ctx) {
  console.log("create data = ")
  const {products, total} = ctx.request.body
  const newOrder = await Order.create({total: total})
  products.map(async (product) => {
    const productInDatabase = await Drink.findByPk(product.id)
    await newOrder.addDrink(productInDatabase, {through: {quantity: product.quantity}})
  })
  ctx.body = newOrder
}

module.exports = {
  findAll,
  create
}
