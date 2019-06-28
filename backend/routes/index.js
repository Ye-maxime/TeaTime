module.exports = (router) => {
  router.prefix('/v1')
  router.use('/drinks', require('./drinks'))
  router.use('/browMenus', require('./browMenus'))
  router.use('/luluMenus', require('./luluMenus'))
  router.use('/stores', require('./stores'))
  router.use('/orders', require('./orders'))
}

