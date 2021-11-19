import React, { useState, useEffect } from 'react';

function Chart() {
    const fetchMessage = async () => {
        try {
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
        <div className="chart">
            This is where the chart will live.
        </div>  
    )
}

export default Chart