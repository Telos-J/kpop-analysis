import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function TweetChartControls({ dates, date, setDate }) {
    const handleChange = event => {
        setDate(event.target.value)
    }

    return (
        <div className="tweet-chart-controls">
            <Box sx={{ width: '20vw' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Date</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={date}
                        label="Date"
                        onChange={handleChange}
                    >
                        {dates.map(date => (
                            <MenuItem key={date} value={date}>
                                {date}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default TweetChartControls
