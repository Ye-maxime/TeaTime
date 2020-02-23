const amqp = require('amqplib/callback_api');
const RabbitmqConstants = require('./RabbitmqConstants');

let pubChannel = null;

function connectPubRabbitmq(queueName, data) {
    amqp.connect(RabbitmqConstants.CONN_URL, (connError, connection) => {
        if (connError) {
            console.log('publisher connError: ', connError);
        } else {
            // Create channel
            connection.createChannel((channelError, channel) => {
                if (channelError) {
                    console.log('chanelError: ', channelError);
                } else {
                    pubChannel = channel;
                    sendMsg(queueName, data);
                }
            });
        }
    });
}

function sendMsg(queueName, data) {
    // Assert Queue
    pubChannel.assertQueue(queueName);
    // Send message to queue
    pubChannel.sendToQueue(
        queueName,
        Buffer.from(data),
        { persistent: true }
    );
    console.log('Message send :', queueName);
}

// Added a process listener to close the RabbitMQ connection when we kill the process
process.on('exit', (code) => {
    pubChannel.close();
    console.log(`Closing rabbitmq channel`);
});

async function publishToQueue(queueName, data) {
    console.log('publishToQueue!!!!');
    if (!pubChannel) {
        connectPubRabbitmq(queueName, data);
    } else {
        sendMsg(queueName, data);
    }
}

module.exports = {
    publishToQueue
}