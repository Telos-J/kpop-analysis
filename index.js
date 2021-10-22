const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api', (req, res) => {
    res.end('This is the API')
})

app.get('*', (req, res) => {
    res.end('Hello World')
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Listening on port http://localhost:${port}`)
