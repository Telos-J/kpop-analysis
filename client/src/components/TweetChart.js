import React, { useState, useEffect } from 'react';
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
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TweetChart() {
    const [data, setData] = useState({
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    })

    const [options, setOptions] = useState({
      layout: {
        padding: {
          top: 20,
          left: 50,
          right: 50,
        },
      },
      plugins: {
        legend: {
            display: true,
            labels: {
                color: 'black',
            },
        },
    },
      scales: {
          x: {
            ticks: {
              color: 'black'
            },
          },
          y: {
              ticks: {
                color: 'black'
              },
          },
      },
    })

    const fetchMessage = async () => {
        try {
           const res = await fetch('twitter/retrieve-tweets?date=2021-11-06')
           const rows = await res.json()
           console.log()
           setData(prev => ({
            labels: rows.map(row => row.hashtag),
            datasets: [
              {
                label: 'Hashtag Frequency',
                data: rows.map(row => row.count),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
              },
            ],
          }))

           console.log(rows)
        } catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    return (
      <div className="tweet-chart-container">
        <div className="tweet-chart">
             <Line data={data} options={options} />
         </div>
      </div>  
    )
}

export default TweetChart