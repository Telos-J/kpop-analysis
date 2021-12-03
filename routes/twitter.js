const express = require('express')
const router = express.Router()
const {
    getRecentSearch,
    retrieveTweetsByDate,
    retrieveTweetsByHashtag,
    retrieveHashtagList,
} = require('../controllers/twitter')

router.get('/recent-search', getRecentSearch)

router.get('/retrieve-tweets-by-date', retrieveTweetsByDate)

router.get('/retrieve-tweets-by-hashtag', retrieveTweetsByHashtag)

router.get('/retrieve-hashtag-list', retrieveHashtagList)

module.exports = router
