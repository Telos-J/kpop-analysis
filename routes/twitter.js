const express = require('express')
const router = express.Router()
const { getRecentSearch } = require('../controllers/twitter')

router.get('/recent-search', getRecentSearch)

module.exports = router
