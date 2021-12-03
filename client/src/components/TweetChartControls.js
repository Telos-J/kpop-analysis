import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

function TweetChartControls({ values, value, setValue, label }) {
    const handleChange = event => {
        setValue(event.target.value)
    }

    return (
        <div className="tweet-chart-controls">
            <Box sx={{ width: '20vw' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label={label}
                        onChange={handleChange}
                    >
                        {values.map(value => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

export default TweetChartControls
