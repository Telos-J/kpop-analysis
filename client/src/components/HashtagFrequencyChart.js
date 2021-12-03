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

function HashtagFrequencyChart({ options, batchSize }) {
    options.plugins.title.text = 'Hashtag Frequency by Date'

    const [dates, setDates] = useState([])
    const [date, setDate] = useState('')
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
            },
        ],
    })

    const fetchDates = async () => {
        const res = await fetch(`twitter/retrieve-date-list?batchSize=${batchSize}`)
        const rows = await res.json()

        setDates(prev => rows.map(row => row.date))
        setDate(prev => rows[0].date)
    }

    useEffect(() => {
        fetchDates()
    }, [])

    const fetchMessage = async () => {
        try {
            const res = await fetch(
                `twitter/retrieve-tweets-by-date?date=${date}&batchSize=${batchSize}`
            )
            const rows = await res.json()
            setData(prev => ({
                labels: rows.map(row => row.hashtag),
                datasets: [
                    {
                        ...prev.datasets[0],
                        label: date,
                        data: rows.map(row => row.count),
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
        <div className="tweet-chart-card">
            <div className="tweet-chart">
                <Line data={data} options={options} />
            </div>
            <TweetChartControls values={dates} value={date} setValue={setDate} label="Date" />
        </div>
    )
}

export default HashtagFrequencyChart
