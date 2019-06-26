const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/luluMenus')
router.get('/', Ctrl.findAllLuluMenu)


module.exports = router.routes()
