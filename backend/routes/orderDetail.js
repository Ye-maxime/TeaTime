const Router = require('koa-router')

const router = new Router()
const Ctrl = require('../controllers/orderDetail')

router.get('/:orderId', Ctrl.findOrder)

module.exports = router.routes()
