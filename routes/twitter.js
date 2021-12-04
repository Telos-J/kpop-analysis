const express = require('express')
const router = express.Router()
const { getRecentSearch } = require('../controllers/recentSearch')
const {
    retrieveTweetsByDate,
    retrieveTweetsByHashtag,
    retrieveHashtagList,
    retrieveDateList,
} = require('../controllers/twitter')

router.get('/recent-search', getRecentSearch)

router.get('/retrieve-tweets-by-date', retrieveTweetsByDate)

router.get('/retrieve-tweets-by-hashtag', retrieveTweetsByHashtag)

router.get('/retrieve-hashtag-list', retrieveHashtagList)

router.get('/retrieve-date-list', retrieveDateList)

module.exports = router
