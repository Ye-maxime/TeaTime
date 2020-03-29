const { Order, Drink } = require('../models/index')
const { publishToQueue } = require('../services/RabbitmqPublisher')
const RabbitmqConstants = require('../services/RabbitmqConstants');

async function findAll(ctx) {
    const { accountId } = ctx.request.body;
    const orders = await Order.findAll({
        where: {
            accountId: accountId
        },
        raw: true, // raw: true => get only dataValues from Sequelize ORM
    });
    ctx.body = orders;
}

async function create(ctx) {
    const { accountId, products, total } = ctx.request.body
    const newOrder = await Order.create({ total: total, accountId: accountId })
    products.map(async (product) => {
        const productInDatabase = await Drink.findByPk(product.id)
        await newOrder.addDrink(productInDatabase, { through: { quantity: product.quantity } })
    })

    console.log('OrderController create !!');
    // publish placed order message to rabbitmq
    await publishToQueue(RabbitmqConstants.QUEUE_NAME, `orderId: ${newOrder.uuid}`);
    ctx.body = newOrder;
}

module.exports = {
    findAll,
    create
}
