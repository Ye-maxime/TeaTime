const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const Cors = require('@koa/cors');
const BodyParser = require('koa-bodyparser');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');
const database = require('./config/database');
const jwt = require('koa-jwt'); // 用于路由权限控制
const { connectConRabbitmq } = require('./services/RabbitmqConsumer');

const app = new Koa()
const router = new Router()

app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
    app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422)
    }
}))

app.use(respond())

//jwt
app.use((ctx, next) => {
    return next().catch(err => {
        if (401 === err.status) {
            console.log("server.js : error in jwt = " + JSON.stringify(err))
            ctx.status = 401;
            ctx.body = {
                ok: false,
                msg: err.originalError ? err.originalError.message : err.message
            }
        } else {
            throw err;
        }
    })
});

/* 路由权限控制 */
app.use(jwt({ secret: 'secret' }).unless({
    // 设置login、register接口，可以不需要认证访问
    path: [ // 数组中的路径不需要通过jwt验证 
        /^\/v1\/account\/login/,
        /^\/v1\/account\/signup/,
        /^\/v1\/drinks\/*/,
        /^\/v1\/stores\/*/
        // account info not available for no logged user
    ]
}));

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(require('koa-static')('./build'))

database.authenticate()
    .then(() => console.log("database connected "))
    .catch(error => console.log(error))

// 注册rabbitmq 的消费者
connectConRabbitmq();

module.exports = { app, database }