module.exports = (router) => {
  router.prefix('/v1')
  router.use('/drinks', require('./drinks'))
}
