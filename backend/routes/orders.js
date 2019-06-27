const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/orders')

router.get('/', Ctrl.findAll)
router.post('/', Ctrl.create)

module.exports = router.routes()
