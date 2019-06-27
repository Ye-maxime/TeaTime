const Order = require('../models/Order')

async function findAll(ctx) {
  const orders = await Order.findAll()
  ctx.body = orders
}

async function create(ctx) {
  const total = ctx.request.body.total
  console.log("create data = ")
  console.log(ctx.request.body)
  const newOrder = await Order.create({total: total})
  ctx.body = newOrder
}

module.exports = {
  findAll,
  create
}
