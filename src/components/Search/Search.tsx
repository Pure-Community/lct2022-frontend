import { Clear } from '@mui/icons-material'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { FC } from 'react'

const Search: FC<{ value: string, onChange: (value: string) => void }> = ({ value, onChange }) => {
    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Поиск по идеям</InputLabel>
            <OutlinedInput
                fullWidth
                label='Поиск по идеям'
                placeholder='Например: Конференция'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => onChange('')}
                            edge="end"
                        >
                            {<Clear />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl >
    )
}

export default Search