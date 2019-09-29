const { Order, Drink } = require('../models/index')

async function findAll(ctx) {
  const orders = await Order.findAll({
    raw: true, // raw: true => get only dataValues from Sequelize ORM
  });
  ctx.body = orders;
}

async function create(ctx) {
  const { products, total } = ctx.request.body
  const newOrder = await Order.create({ total: total })
  products.map(async (product) => {
    const productInDatabase = await Drink.findByPk(product.id)
    await newOrder.addDrink(productInDatabase, { through: { quantity: product.quantity } })
  })
  ctx.body = newOrder
}

module.exports = {
  findAll,
  create
}
