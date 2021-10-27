const express = require('express')
const app = express()
const router = express.Router()

router.get('/', (req, res) => {
    res.end('This is the API')
})

router.get('*', (req, res) => {
    res.status(404).end('👻 Page not found')
})

module.exports = router
