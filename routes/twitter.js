const express = require('express')
const router = express.Router()
const { getRecentSearch, retrieveTweets } = require('../controllers/twitter')

router.get('/recent-search', getRecentSearch)

router.get('/retrieve-tweets', retrieveTweets)

module.exports = router
