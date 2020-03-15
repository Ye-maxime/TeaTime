module.exports = {
    CONN_URL: 'amqp://localhost',
    // CONN_URL: 'amqp://rabbitmq:5672', // 启动docker时使用  //TODO use process.env to replace it 
    QUEUE_NAME: 'teatime placed order'
}