const { Order, Drink } = require('../models/index')

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
  products.map(async (product) => {
    console.log("in map !!!")
    const productInDatabase = await Drink.findByPk(product.id)
    await newOrder.addDrink(productInDatabase)
  })
  console.log("avant !!!")
  //todo async avant send
  ctx.body = newOrder
}

module.exports = {
  findAll,
  create
}
