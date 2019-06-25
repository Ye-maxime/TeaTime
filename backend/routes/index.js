module.exports = (router) => {
  router.prefix('/v1')
  router.use('/drinks', require('./drinks'))
  router.use('/browMenus', require('./browMenus'))
}

/*
module.exports = (router) => {
  router.prefix('/v2')
  router.use('/browMenus', require('./browMenus'))
}
*/
