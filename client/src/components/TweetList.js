import React, { useState, useEffect } from 'react'
import Tweet from './Tweet'
import socketIOClient from 'socket.io-client'

function TweetList() {
    const [tweets, setTweets] = useState([])

    const fetchMessage = async () => {
        try {
            const res = await fetch('twitter/retrieve-tweets')
            const newTweets = await res.json()
            setTweets(prev => [...prev, ...newTweets])

            const socket = socketIOClient('/')
            socket.on('connect', () => {
                console.log('new connection')
            })
            //socket.on('tweet', json => {
            //    if (json.data) setTweets(prev => [json.data, ...prev])
            //})
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    return (
        <div className="tweet-list">
            {tweets.length && tweets.map(tweet => <Tweet key={tweet.id} id={tweet.id} />)}
        </div>
    )
}

export default TweetList
