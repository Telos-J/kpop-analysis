import React, { useState, useEffect } from 'react';
import Tweet from './Tweet'

function TweetList() {
    const [tweets, setTweets] = useState([])

    const fetchMessage = async () => {
        try {
           const res = await fetch('twitter/recent-search')
           console.log(res)
           const newTweets = await res.json()
           console.log(newTweets)
           setTweets(prev => [...prev, ...newTweets])
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    return(
       <div className="tweet-list">
            {
                tweets.length &&
                tweets.map((tweet) => (
                    <Tweet key={tweet.id} id={tweet.id} />
                ))
            }
        </div>
    )
}

export default TweetList