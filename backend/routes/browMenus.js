const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/browMenus')

router.get('/', Ctrl.findAllBrowMenus())
// router.post('/:id', Ctrl.update)
// router.delete('/:id', Ctrl.destroy)

module.exports = router.routes()
