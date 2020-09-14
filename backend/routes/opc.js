const Router = require('koa-router')

const router = new Router()
const Ctrl = require('../controllers/opc')

router.post('/', Ctrl.getOPC)

module.exports = router.routes()
