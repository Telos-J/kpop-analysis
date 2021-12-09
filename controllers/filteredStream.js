const needle = require('needle')
const { insertTweet, insertHashtagsFromTweet } = require('./twitter')

const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules'
const streamURL =
    'https://api.twitter.com/2/tweets/search/stream?tweet.fields=entities%2Ccreated_at'

const rules = [{ value: 'twice' }]

async function getAllRules() {
    const response = await needle('get', rulesURL, {
        headers: {
            authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
    })

    if (response.statusCode !== 200) {
        console.log('Error:', response.statusMessage, response.statusCode)
        throw new Error(response.body)
    }

    return response.body
}

async function deleteAllRules(rules) {
    if (!Array.isArray(rules.data)) {
        return null
    }

    const ids = rules.data.map(rule => rule.id)

    const data = {
        delete: {
            ids: ids,
        },
    }

    const response = await needle('post', rulesURL, data, {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
    })

    if (response.statusCode !== 200) {
        throw new Error(response.body)
    }

    return response.body
}

async function setRules() {
    const data = {
        add: rules,
    }

    const response = await needle('post', rulesURL, data, {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
    })

    if (response.statusCode !== 201) {
        throw new Error(response.body)
    }

    return response.body
}

function streamConnect(retryAttempt, io) {
    const stream = needle.get(streamURL, {
        headers: {
            'User-Agent': 'v2FilterStreamJS',
            authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
        timeout: 20000,
    })

    stream
        .on('data', data => {
            try {
                const json = JSON.parse(data)
                insertTweet(json.data)
                insertHashtagsFromTweet(json.data)
                //io.emit('tweet', json)
                retryAttempt = 0
            } catch (e) {
                if (
                    data.detail ===
                    'This stream is currently at the maximum allowed connection limit.'
                ) {
                    console.log(data.detail)
                    process.exit(1)
                }
            }
        })
        .on('err', error => {
            if (error.code !== 'ECONNRESET') {
                console.log(error.code)
                process.exit(1)
            } else {
                setTimeout(() => {
                    console.warn('A connection error occurred. Reconnecting...')
                    streamConnect(++retryAttempt)
                }, 2 ** retryAttempt)
            }
        })

    return stream
}

async function streamTweets(io) {
    let currentRules

    try {
        currentRules = await getAllRules()

        await deleteAllRules(currentRules)

        await setRules()
    } catch (e) {
        console.error(e)
        process.exit(1)
    }

    streamConnect(1, io)
}

module.exports = { streamTweets }
