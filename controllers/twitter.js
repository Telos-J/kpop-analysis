const needle = require('needle')
const format = require('pg-format')
const pool = require('../db')

async function getRecentSearch(req, res) {
    try {
        const endpointUrl = "https://api.twitter.com/2/tweets/search/recent"
        const params = {
            'query': 'twice',
            'max_results': 100,
            'tweet.fields': 'entities,created_at',
            //'start_time': '2021-11-05T00:00:00Z',
            'end_time': '2021-11-05T23:59:59Z'
        }

        const searchRes = await needle('get', endpointUrl, params, {
            headers: {
                "User-Agent": "v2RecentSearchJS",
                "authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        })

        //insertTweets(searchRes.body.data)
        retrieveTweets('2021-11-12')
        res.json(searchRes.body.data)
    } catch (err) {
        console.log(err.message)
    }
}

async function insertTweets(req, res) {
    try {
        const values = []
        for (const tweet of data) {
            console.log(tweet)
            if (!tweet.entities?.hashtags) continue
            for (const hashtag of tweet.entities.hashtags) {
                values.push([tweet.id, hashtag.tag, tweet.created_at])
            }
        }
        
        const query = format('INSERT INTO hashtags (tweet_id, hashtag, created_at) VALUES %L', values)
        const res = await pool.query(query)
        console.log(res)
    } catch (err) {
        console.log(`ERROR!!! ${err.message}`)
    }
}

async function retrieveTweets(req, res) {
    try {
        const text = 
            'SELECT hashtag, COUNT(hashtag) FROM hashtags WHERE created_at LIKE $1 GROUP BY 1 ORDER BY 2 DESC LIMIT 10'
        const values = [req.query.date + '%']
        const result = await pool.query(text, values)
        res.json(result.rows)
      }  catch(err) {
            console.log('ERROR!!${err.message}')
        }
    }

module.exports = {
    getRecentSearch,
    retrieveTweets,
}
