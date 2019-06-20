module.exports = (router) => {
  router.prefix('/v1')
  router.use('/todos', require('./todos'))
  router.use('/drinks', require('./drinks'))
}
