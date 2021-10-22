const express = require('express')
const needle = require('needle');
const path = require('path')
const { URL,URLSearchParams } = require('url')

const app = express()

const token = 'AAAAAAAAAAAAAAAAAAAAAO1NUQEAAAAA%2BPmDUXuNwvYtvzfuxMiXvh4aDDs%3DSGy6An1xMOw5LDJg1XUBPjEN1XdxsULSS7fESfbIYowRdwFHB3';

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api', (req, res) => {
    res.end('This is the API')
})

app.get('/recent-search', async (req, res) => {
    const body = await getRequest()
    res.json(body)
})

app.get('*', (req, res) => {
    res.end('Hello World')
})

async function getRequest() {
    const endpointUrl = "https://api.twitter.com/2/tweets/search/recent"

    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
    const params = {
        'query': 'twice',
        'max_results': 10,
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body.data;
    } else {
        throw new Error('Unsuccessful request');
    }
}

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Listening on port http://localhost:${port}`)
