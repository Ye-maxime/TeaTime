const Router = require('koa-router')

const router = new Router()
const Ctrl = require('../controllers/account')

router.post('/signup', Ctrl.signup)
router.post('/getAccountInfos', Ctrl.getAccountInfos)
router.post('/login', Ctrl.login)

module.exports = router.routes()
