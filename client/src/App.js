import React, { useState, useEffect } from 'react';
import Tweet from './components/Tweet'
import logo from './logo.svg'
import './App.css';

function App() {
    const [tweets, setTweets] = useState([])

    const fetchMessage = async () => {
        const res = await fetch('/recent-search')
        const newTweets = await res.json()
        console.log(newTweets)
        setTweets(prev => [...prev, ...newTweets])
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
