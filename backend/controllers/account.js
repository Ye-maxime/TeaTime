const { Account } = require('../models/index');
const auth = require('../auth')

async function signup(ctx) {
    const { firstname, lastname, email, password } = ctx.request.body;
    const accountInDB = await Account.findOne({ where: { email: email } });
    if (accountInDB) {
        ctx.body = { success: false, error: 'Email is already registered!' };
    } else {
        const newAccount = await Account.create({ firstname: firstname, lastname: lastname, email: email, password: password });
        const token = auth.sign(ctx, ctx.request.body);
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
            ctx.body = { success: true, token: token, id: accountInDB.id, email: accountInDB.email };
        }
    }
}

async function getAccountInfos(ctx) {
    const id = ctx.request.body;
    const isJwtError = auth.verify(ctx.headers.authorization);
    console.log('isJwtError = ' + isJwtError)
    if (!isJwtError) {
        const currentAccount = await Account.findByPk(id);
        console.log('currentAccount = ' + currentAccount);
        ctx.body = { id: currentAccount.id, email: currentAccount.email };
    }
}

module.exports = {
    signup,
    login,
    getAccountInfos
}
