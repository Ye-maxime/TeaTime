/* eslint-disable no-console */
const { app } = require('./server')
const config = require('./config/config');

const port = config.port || 4000
const server = app.listen(port, () => console.log(`API server started on ${port}`))

// socket.io instantiation
// eslint-disable-next-line import/order
const io = require('socket.io')(server)

// listen on every connection
io.on('connection', (socket) => {
    console.log('New client connected !')

    socket.on('connected', (data) => {
        socket.emit('connected', {
            author: 'them',
            type: 'text',
            data: {
                text: `Hello ${data.message.user}! Can I help you?`,
            },
        });
    })

    socket.on('new_message', (data) => {
        console.log('new_message reçu en serveur : ')
        console.log(data)
        socket.emit('new_message', {
            author: 'them',
            type: 'text',
            data: {
                text: 'You can get more information in our site!',
            },
        });
    })
})

module.exports = { server }
