import React, { useState, useEffect } from 'react';
import Tweet from './components/Tweet'
import logo from './logo.svg'
import './App.css';

function App() {
    const [tweets, setTweets] = useState([])

    const fetchMessage = async () => {
        try {
            //const res = await fetch('twitter/recent-search')
            //console.log(res)
            //const newTweets = await res.json()
            //console.log(newTweets)
           // setTweets(prev => [...prev, ...newTweets])
           const res = await fetch('twitter/retrieve-tweets?date=2021-11-12')
           const rows = await res.json()
           console.log(rows)
        } catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <main className="App-main">
                {
                    tweets.length &&
                    tweets.map((tweet) => (
                        <Tweet key={tweet.id} id={tweet.id} />
                    ))
                }
            </main>
        </div>
    );
}

export default App;
