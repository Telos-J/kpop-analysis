const needle = require('needle')
const { insertTweets } = require ('./twitter')

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

module.exports = { getRecentSearch }