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

/*
* 只验证并扣减库存 并不生成订单
* ctx.request.body 包含了accountId, products, total
*/
async function placeOrder(ctx) {
    const products = ctx.request.body.products;
    const productsEntity = [];
    let allProductsAvailable = true;

    for (let i = 0; i < products.length; i++) {
        const productInDatabase = await Drink.findByPk(products[i].id);
        if (productInDatabase.stock >= products[i].quantity) {
            // 库存充足
            productsEntity.push(productInDatabase);
        } else {
            // 没有库存
            allProductsAvailable = false;
            break;
        }
    }

    if (allProductsAvailable) {
        // 先扣减订单中每个产品的库存 
        productsEntity.forEach(async (productEntity, index) => {
            const newStock = productEntity.stock - products[index].quantity;
            await productEntity.update({ stock: newStock });
        });

        console.log('库存扣减完毕 推送订单到MQ !!');
        await publishToQueue(RabbitmqConstants.QUEUE_NAME, ctx.request.body);
        ctx.body = { success: true };
    } else {
        console.log('库存不足 返回错误 !!');
        ctx.body = { success: false };
    }
}

/*
* 生成订单
*/
async function createOrder(data) {
    // 消费MQ队列 来生成订单 (不再需要扣减库存，直接生成订单以及级联表数据)
    const { accountId, products, total } = data;
    const newOrder = await Order.create({ total: total, accountId: accountId });
    products.forEach(async (product) => {
        const productInDatabase = await Drink.findByPk(product.id);
        await newOrder.addDrink(productInDatabase, { through: { quantity: product.quantity } });
    });
    console.log('数据库订单创建完毕 !!');
}

module.exports = {
    findAll,
    placeOrder,
    createOrder
}
