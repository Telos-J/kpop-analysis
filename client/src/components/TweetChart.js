import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import TweetChartControls from './TweetChartControls'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const dates = ['2021-11-18', '2021-11-19']

function TweetChart() {
    const [date, setDate] = React.useState(dates[0])
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    })
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
                text: 'Hashtag Frequency by Date',
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

    const fetchMessage = async () => {
        try {
            const res = await fetch(`twitter/retrieve-tweets?date=${date}`)
            const rows = await res.json()
            setData(prev => ({
                labels: rows.map(row => row.hashtag),
                datasets: [
                    {
                        label: date,
                        data: rows.map(row => row.count),
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                    },
                ],
            }))
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [date])

    return (
        <div className="tweet-chart-container">
            <div className="tweet-chart-card">
                <div className="tweet-chart">
                    <Line data={data} options={options} />
                </div>
                <TweetChartControls dates={dates} date={date} setDate={setDate} />
            </div>
        </div>
    )
}

export default TweetChart

