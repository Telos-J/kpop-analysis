const needle = require('needle')
const format = require('pg-format')
const pool = require('../db')
const {
    retrieveTweetsByDateQuery,
    retrieveTweetsByHashtagQuery,
    retrieveHashtagListQuery,
} = require('../queries')

async function getRecentSearch(req, res) {
    try {
        const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'
        const params = {
            query: 'twice',
            max_results: 10,
            'tweet.fields': 'entities,created_at',
            //start_time: '2021-11-26T00:00:00Z',
            //end_time: '2021-11-26T23:59:59Z',
        }

        const searchRes = await needle('get', endpointUrl, params, {
            headers: {
                'User-Agent': 'v2RecentSearchJS',
                authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            },
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
        for (const tweet of data) {
            if (!tweet.entities?.hashtags) continue
            for (const hashtag of tweet.entities.hashtags) {
                values.push([tweet.id, hashtag.tag, tweet.created_at])
            }
        }
        const query = format(
            'INSERT INTO hashtags (tweet_id, hashtag, created_at) VALUES %L',
            values
        )
        const res = await pool.query(query)
        console.log(res)
    } catch (err) {
        console.log(`ERROR!!! ${err.message}`)
    }
}

async function retrieveTweetsByDate(req, res) {
    try {
        const values = [req.query.batchSize, req.query.date + '%']
        const result = await pool.query(retrieveTweetsByDateQuery, values)
        res.json(result.rows)
    } catch (err) {
        console.log(`ERROR!!${err.message}`)
    }
}

async function retrieveDateList(req, res) {
    try {
        const text =
            'SELECT LEFT(created_at, 10) AS date FROM hashtags GROUP BY 1 HAVING COUNT(*) >= $1 ORDER BY 1'
        const values = [req.query.batchSize]
        const result = await pool.query(text, values)
        res.json(result.rows)
    } catch (err) {
        console.log(`ERROR!!${err.message}`)
    }
}

async function retrieveTweetsByHashtag(req, res) {
    try {
        const values = [req.query.batchSize, req.query.hashtag]
        const result = await pool.query(retrieveTweetsByHashtagQuery, values)
        res.json(result.rows)
    } catch (err) {
        console.log(`ERROR!!${err.message}`)
    }
}

async function retrieveHashtagList(req, res) {
    try {
        const result = await pool.query(retrieveHashtagListQuery)
        res.json(result.rows)
    } catch (err) {
        console.log(`ERROR!!${err.message}`)
    }
}

module.exports = {
    getRecentSearch,
    retrieveTweetsByDate,
    retrieveDateList,
    retrieveTweetsByHashtag,
    retrieveHashtagList,
}
