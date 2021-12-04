const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const twitterRouter = require('./routes/twitter')
const { streamTweets } = require('./controllers/filteredStream')
const app = express()
const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer(app)
const io = socketIo(server)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
} else {
    require('dotenv').config()
}

const PORT = process.env.PORT || 5000

app.use('/twitter', twitterRouter)
app.use('/', indexRouter)

io.on('connection', async socket => {
    console.log('new connection')
    const data = { id: '1461555817405194242' }
    io.emit('tweet', data)
    streamTweets(io)
})

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
