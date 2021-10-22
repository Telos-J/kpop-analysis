import React, { useState, useEffect } from 'react';
import logo from './logo.svg'
import './App.css';

function App() {
    const [message, setMessage] = useState('')

    const fetchMessage = async () => {
        const res = await fetch('/api')
        const message = await res.text()
        setMessage(message)
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;
