import React, { useState, useEffect } from 'react'
import HashtagFrequencyChart from './HashtagFrequencyChart'
import HashtagLifetimeChart from './HashtagLifetimeChart'

function TweetChart() {
    const [batchSize, setBatchSize] = useState(1000)
    const [options, setOptions] = useState({
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                left: 50,
                right: 50,
            },
        },
        plugins: {
            title: {
                display: true,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
            },
            y: {
                ticks: {
                    color: 'black',
                },
            },
        },
    })

    return (
        <div className="tweet-chart-container">
            <HashtagFrequencyChart options={options} batchSize={batchSize} />
            <HashtagLifetimeChart options={options} batchSize={batchSize} />
        </div>
    )
}

export default TweetChart
