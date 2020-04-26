const amqp = require('amqplib/callback_api');
const RabbitmqConstants = require('./RabbitmqConstants');

function connectConRabbitmq() {
    console.log('[RabbitmqConsumer.js#connectConRabbitmq] : consumer start');
    amqp.connect(RabbitmqConstants.CONN_URL, (connError, connection) => {
        if (connError) {
            console.log('[RabbitmqConsumer.js#connectConRabbitmq] : consumer connError: ', connError);
        } else {
            // Create channel
            connection.createChannel((channelError, channel) => {
                if (channelError) {
                    console.log('[RabbitmqConsumer.js#connectConRabbitmq] : consumer chanelError: ', channelError);
                } else {
                    channel.consume(RabbitmqConstants.QUEUE_NAME, async (msg) => {
                        // 消费事件 生成订单
                        await require('../controllers/orders').createOrder(JSON.parse(msg.content));
                        channel.ack(msg);
                    }, { noAck: false });
                    // If we set the noAck field as true, then the queue will delete the message the moment it is read from the queue.
                }
            });
        }
    });
}

module.exports = {
    connectConRabbitmq
}