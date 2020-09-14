/* eslint-disable max-len */
const { getProductStockInfosFromCache } = require('../middleware/cache')

async function getOPC(ctx) {
    // Verify Cache Stock
    const availableProducts = await getProductStockInfosFromCache(ctx);
    const total = availableProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
    ctx.body = { availableProducts, total };
}

module.exports = {
    getOPC,
}
