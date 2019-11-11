const { Order, Drink } = require('../models/index')
const auth = require('../auth')

async function findAll(ctx) {
  const isJwtError = auth.verify(ctx.headers.authorization);
  console.log('isJwtError = ' + isJwtError)
  if (!isJwtError) {
    const { accountId } = ctx.request.body;
    const orders = await Order.findAll({
      where: {
        accountId: accountId
      },
      raw: true, // raw: true => get only dataValues from Sequelize ORM
    });
    ctx.body = orders;
  }
}

async function create(ctx) {
  const isJwtError = auth.verify(ctx.headers.authorization);
  console.log('isJwtError = ' + isJwtError)
  if (!isJwtError) {
    const { accountId, products, total } = ctx.request.body
    const newOrder = await Order.create({ total: total, accountId: accountId })
    products.map(async (product) => {
      const productInDatabase = await Drink.findByPk(product.id)
      await newOrder.addDrink(productInDatabase, { through: { quantity: product.quantity } })
    })
    ctx.body = newOrder
  }
}

module.exports = {
  findAll,
  create
}
