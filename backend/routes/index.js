const drinksRoutes = require('./drinks');
const storesRoutes = require('./stores');
const ordersRoutes = require('./orders');
const orderDetailRoutes = require('./orderDetail');
const accountRoutes = require('./account');
const opcRoutes = require('./opc');

module.exports = (router) => {
    router.prefix('/v1')
    router.use('/drinks', drinksRoutes)
    router.use('/stores', storesRoutes)
    router.use('/orders', ordersRoutes)
    router.use('/order_detail', orderDetailRoutes)
    router.use('/account', accountRoutes)
    router.use('/opc', opcRoutes)
}
