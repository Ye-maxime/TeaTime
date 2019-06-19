const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const pg = require('pg')


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

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(require('koa-static')('./build'))


const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  database: 'teatime',
  password: 'root'
});

pool.on('error',function(err,client){
  console.log(err.message,err.stack);
});

pool.on('connect',cl=>{
  console.log('Connected!!!');
});
pool.on('acquire',cl=>{
  console.log('Acquired!!!');
});

exports.pool = pool
module.exports = app
