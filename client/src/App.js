import React, { useState, useEffect } from 'react';
import TweetList from './components/TweetList'
import Chart from './components/Chart'
import logo from './logo.svg'
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <main className="App-main">
                <TweetList />
                <Chart />
            </main>
        </div>
    )
}

export default App;
