const { redis } = require('../config/redis');

// cache middleware
function cacheGetAccountInfos(ctx) {
    return new Promise(function (resolve, reject) {
        const accountId = ctx.request.body.accountId;
        redis.get(`account-${accountId}`, (err, data) => {
            if (err) reject(err);
            console.log("!!!! cacheGetAccountInfos data = ")
            console.log(data);
            resolve(data);
        });
    });
}

module.exports = { cacheGetAccountInfos }