const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api', (req, res) => {
    res.end('🍕')
})

app.get('*', (req, res) => {
    res.status(404).end('👻 Page not found.')
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Listening on port http://localhost:${port}`)

