const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const twitterRouter = require('./routes/twitter')
const app = express()

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
} else {
    require("dotenv").config();
}

const port = process.env.PORT || 5000

app.use('/twitter', twitterRouter)
app.use('/', indexRouter)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
