const { Account } = require('../models/index');
const { saveAccountInfosInCache, getAccountInfosFromCache } = require('../middleware/cache')
const auth = require('../auth');

async function signup(ctx) {
    const { firstname, lastname, email, password } = ctx.request.body;
    const accountInDB = await Account.findOne({ where: { email: email } });
    if (accountInDB) {
        ctx.body = { success: false, error: 'Email is already registered!' };
    } else {
        const newAccount = await Account.create({ firstname: firstname, lastname: lastname, email: email, password: password });
        const token = auth.sign(ctx, ctx.request.body);
        // redis
        await saveAccountInfosInCache(newAccount);
        ctx.body = { success: true, token: token, id: newAccount.id, email: newAccount.email };
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
            // redis
            await saveAccountInfosInCache(accountInDB);
            ctx.body = { success: true, token: token, id: accountInDB.id, email: accountInDB.email };
        }
    }
}

async function getAccountInfos(ctx) {
    const accountInfos = await getAccountInfosFromCache(ctx);
    if (!accountInfos) {
        console.log("!!!!getAccountInfos in controller from db")
        const accountId = ctx.request.body.accountId;
        const currentAccount = await Account.findByPk(accountId);
        console.log('currentAccount = ' + currentAccount);
        // redis
        await saveAccountInfosInCache(currentAccount);
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
