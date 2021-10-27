const needle = require('needle')
const format = require('pg-format')
const pool = require('../db')

async function getRecentSearch(req, res) {
    try {
        const endpointUrl = "https://api.twitter.com/2/tweets/search/recent"
        const params = {
            'query': 'twice',
            'max_results': 10,
            'tweet.fields': 'entities'
        }

        const searchRes = await needle('get', endpointUrl, params, {
            headers: {
                "User-Agent": "v2RecentSearchJS",
                "authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        })

        insertTweets(searchRes.body.data)
        res.json(searchRes.body.data)
    } catch (err) {
        console.log(err.message)
    }
}

async function insertTweets(data) {
    try {
        const values = []
        for (const tweet of data) values.push([tweet.id, tweet.text])
        const query = format('INSERT INTO tweets (id, text) VALUES %L', values)
        await pool.query(query)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getRecentSearch
}
