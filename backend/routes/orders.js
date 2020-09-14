const Router = require('koa-router')

const router = new Router()
const Ctrl = require('../controllers/orders')

router.post('/getOrders', Ctrl.findAll)
router.post('/saveOrder', Ctrl.placeOrder)

module.exports = router.routes()
