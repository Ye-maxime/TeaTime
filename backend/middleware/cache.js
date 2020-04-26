const { redis, MAX_AGE } = require('../config/redis')

class RedisAccountInfos {
    constructor(id, firstname, lastname, email) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}

async function saveAccountInfosInCache(accountEntity) {
    const redisAccountInfos = new RedisAccountInfos(accountEntity.id, accountEntity.firstname, accountEntity.lastname, accountEntity.email);
    // 可以在terminal 用redis-cli找到该account-x 的信息
    await redis.set(`account-${redisAccountInfos.id}`, JSON.stringify(redisAccountInfos), 'EX', MAX_AGE / 1000);
}

// cache middleware
function getAccountInfosFromCache(ctx) {
    return new Promise(function (resolve, reject) {
        const accountId = ctx.request.body.accountId;
        redis.get(`account-${accountId}`, (err, data) => {
            if (err) reject(err);
            console.log("cache.js#getAccountInfosFromCache : data = ")
            console.log(data);
            resolve(data);
        });
    });
}

/*
* 存储产品的库存信息到redis中
*/
async function saveProductStockInfosInCache(productsEntity) {
    for (let product of productsEntity) {
        await redis.hset('products-stock', product.id, product.stock);
    }
}

/*
* 从redis中获取产品的库存信息
*/
function getProductStockInfosFromCache(ctx) {
    return new Promise(function (resolve, reject) {
        const products = ctx.request.body;
        redis.hgetall('products-stock', async (err, data) => {
            if (err) reject(err);
            console.log("cache.js#getProductStockInfosFromCache : data = ")
            console.log(data);
            for (let product of products) {
                if (data[product.id] < product.quantity) {
                    // cache中的库存少于要买的个数
                    // TODO只能提醒用户购买数量会变少,显示在opc对应的产品行上
                    product.quantity = data[product.id];
                    // 更新cache中当前产品的库存
                    // increment 原子操作保证库存安全
                    await redis.hincrby('products-stock', product.id, -data[product.id]);
                } else {
                    // 更新cache中当前产品的库存
                    await redis.hincrby('products-stock', product.id, -product.quantity);
                }
            }
            resolve(products);
        });
    });
}

module.exports = {
    saveAccountInfosInCache,
    getAccountInfosFromCache,
    saveProductStockInfosInCache,
    getProductStockInfosFromCache
}