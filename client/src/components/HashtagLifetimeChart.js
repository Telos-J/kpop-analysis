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

function HashtagLifetimeChart({ options }) {
    options.plugins.title.text = 'Hashtag Lifetime'

    const [hashtags, setHashtags] = React.useState([])
    const [hashtag, setHashtag] = React.useState('')
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

    const fetchHashtags = async () => {
        const res = await fetch(`twitter/retrieve-hashtag-list`)
        const rows = await res.json()

        setHashtags(prev => rows.map(row => row.hashtag))
        setHashtag(prev => rows[0].hashtag)
    }

    useEffect(() => {
        fetchHashtags()
    }, [])

    const fetchMessage = async () => {
        try {
            const res = await fetch(`twitter/retrieve-tweets-by-hashtag?hashtag=${hashtag}`)
            const rows = await res.json()
            setData(prev => ({
                labels: rows.map(row => row.date),
                datasets: [
                    {
                        ...prev.datasets[0],
                        label: hashtag,
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
    }, [hashtag])

    return (
        <div className="tweet-chart-card">
            <div className="tweet-chart">
                <Line data={data} options={options} />
            </div>
            <TweetChartControls
                values={hashtags}
                value={hashtag}
                setValue={setHashtag}
                label="Hashtag"
            />
        </div>
    )
}

export default HashtagLifetimeChart
