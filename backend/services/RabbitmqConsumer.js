const amqp = require('amqplib/callback_api');
const RabbitmqConstants = require('./RabbitmqConstants');

function connectConRabbitmq() {
    amqp.connect(RabbitmqConstants.CONN_URL, (connError, connection) => {
        if (connError) {
            console.log('consumer connError: ', connError);
        } else {
            // Create channel
            connection.createChannel((channelError, channel) => {
                if (channelError) {
                    console.log('chanelError: ', channelError);
                } else {
                    channel.consume(RabbitmqConstants.QUEUE_NAME, (msg) => {
                        console.log('......');
                        // We’re printing the message after a delay of 8 seconds just to mock a I/O operation.
                        setTimeout(() => {
                            // 假设order内的饮料制作完成，出消息队列
                            console.log("Consumer message, order finished : ", msg.content.toString());
                            channel.ack(msg);
                        }, 8000);
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