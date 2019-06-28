module.exports = (router) => {
  router.prefix('/v1')
  router.use('/drinks', require('./drinks'))
  router.use('/stores', require('./stores'))
  router.use('/orders', require('./orders'))
}

