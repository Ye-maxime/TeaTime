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
    app.use(Logger()) // Logger 尽量放文件开头，因为按照app.use 调用的顺序来执行各种middleware
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
    // 下面的next() 会先调用下面app.use(jwt({ secret: 'secret' })... 这个middleware，然后根据它返回的值进行catch 或者直接return
    return next().catch(err => {
            // 这里可以catch 比如不合法的token或者缺少token的情况
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

/* 路由权限控制:提供统一的认证方式和鉴权功能，避免重复开发 (体现出AOP面向切面编程) 
   这个middleware 会先判断请求的path是否需要jwt验证，不需要则放行，需要的话则会自动根据secret密钥调用jwt.verify() 进行token的验证
*/
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
    .then(() => console.log("server.js : database connected "))
    .catch(error => console.log(error))

// 注册rabbitmq 的消费者
connectConRabbitmq();

module.exports = { app, database }