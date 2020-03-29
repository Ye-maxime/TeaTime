const jwt = require('jsonwebtoken'); // 用于签发、解析`token`

// CONSTANTS
const AUTHORIZATION = 'Authorization';
const expiresIn = '1h'; //
const tokenName = 'jwt';
const secret = 'secret';

const auth = {
    sign: (ctx, info) => {
        const token = jwt.sign(info || { name: 'Maxime' }, secret, { expiresIn });
        ctx.set(AUTHORIZATION, `Bearer ${token}`);
        ctx.cookies.set(tokenName, token, {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',
            maxAge: expiresIn,
            httpOnly: true
        });
        return token;
    },

    // verify: (token) => {
    //     let ret = true;
    //     try {
    //         // verify 正确的时候返回 payload，错误的时候throw 一个 err，里面包含了错误的message，根据message判断错误类型。
    //         // token like: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxsZGZnaWRmZ0BmZmcuY29tIiwicGFzc3dvcmQiOiJzZGYiLCJpYXQiOjE1NzI3OTg1NjcsImV4cCI6MTU3MjgwMjE2N30.zVv_QZu3Jn4eLvxmJxuFU_T6ttVHiBM39Wtjjno1glQ
    //         const payload = jwt.verify(token.split(' ')[1], secret);
    //         console.log(`verify payload = ` + JSON.stringify(payload));
    //         ret = false;
    //     } catch (err) {
    //         console.log('verify token error = ' + err.name);
    //     }
    //     return ret;
    // }
}

module.exports = auth;