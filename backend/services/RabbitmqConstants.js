const config = require('../config/config');

module.exports = {
    CONN_URL: config.rabbitmqConnURL,
    QUEUE_NAME: 'teatime placed order',
}
