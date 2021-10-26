const needle = require('needle');

async function getRecentSearch(req, res) {
    const endpointUrl = "https://api.twitter.com/2/tweets/search/recent"
    const params = {
        'query': 'twice',
        'max_results': 10,
    }

    const searchRes = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    })

    if (searchRes.body) {
        res.json(searchRes.body.data)
    } else {
        throw new Error('Unsuccessful request');
    }
}

module.exports = {
    getRecentSearch
}
