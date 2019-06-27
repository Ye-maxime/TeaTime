const Order = require('../models/Order')
const DrinkOrder = require('../models/DrinkOrder')

async function findAll(ctx) {
  const orders = await Order.findAll()
  ctx.body = orders
}

async function create(ctx) {
  console.log("create data = ")
  const {products, total} = ctx.request.body
  console.log(products)
  console.log(total)
  const newOrder = await Order.create({total: total})
  await products.map((product) => DrinkOrder.create({orderId: newOrder.id, drinkId: product.id}))
  ctx.body = newOrder
}

module.exports = {
  findAll,
  create
}
