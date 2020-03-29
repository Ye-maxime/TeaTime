const { Account } = require('../models/index');
const { cacheGetAccountInfos } = require('../middleware/cache')
const { redis, MAX_AGE } = require('../config/redis')
const auth = require('../auth');

class RedisAccountInfos {
    constructor(id, firstname, lastname, email) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}

async function signup(ctx) {
    const { firstname, lastname, email, password } = ctx.request.body;
    const accountInDB = await Account.findOne({ where: { email: email } });
    if (accountInDB) {
        ctx.body = { success: false, error: 'Email is already registered!' };
    } else {
        const newAccount = await Account.create({ firstname: firstname, lastname: lastname, email: email, password: password });
        const token = auth.sign(ctx, ctx.request.body);
        const redisAccountInfos = new RedisAccountInfos(newAccount.id, newAccount.firstname, newAccount.lastname, newAccount.email);
        // redis  然后在terminal 用redis-cli找到该account:xx 的信息
        await redis.set(`account-${redisAccountInfos.id}`, JSON.stringify(redisAccountInfos), 'EX', MAX_AGE / 1000);
        ctx.body = { success: true, token: token, id: redisAccountInfos.id, email: redisAccountInfos.email };
    }
}

async function login(ctx) {
    const { email, password } = ctx.request.body;
    const accountInDB = await Account.findOne({ where: { email: email } });
    if (!accountInDB) {
        ctx.body = { success: false, error: 'Account does not exist!' };
    } else {
        if (accountInDB.password !== password) {
            ctx.body = { success: false, error: 'Password not correct!' };
        } else {
            const token = auth.sign(ctx, ctx.request.body);
            const redisAccountInfos = new RedisAccountInfos(accountInDB.id, accountInDB.firstname, accountInDB.lastname, accountInDB.email);
            // redis  set
            await redis.set(`account-${redisAccountInfos.id}`, JSON.stringify(redisAccountInfos), 'EX', MAX_AGE / 1000);
            ctx.body = { success: true, token: token, id: redisAccountInfos.id, email: redisAccountInfos.email };
        }
    }
}

async function getAccountInfos(ctx) {
    const accountInfos = await cacheGetAccountInfos(ctx);
    if (!accountInfos) {
        console.log("!!!!getAccountInfos in controller from db")
        const accountId = ctx.request.body.accountId;
        const currentAccount = await Account.findByPk(accountId);
        console.log('currentAccount = ' + currentAccount);
        ctx.body = { id: currentAccount.id, firstname: currentAccount.firstname, lastname: currentAccount.lastname, email: currentAccount.email };
    } else {
        console.log("!!!!getAccountInfos in controller from redis = " + accountInfos)
        ctx.body = accountInfos;
    }
}

module.exports = {
    signup,
    login,
    getAccountInfos
}
