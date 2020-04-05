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
            console.log("!!!! getAccountInfosFromCache data = ")
            console.log(data);
            resolve(data);
        });
    });
}

module.exports = { saveAccountInfosInCache, getAccountInfosFromCache }