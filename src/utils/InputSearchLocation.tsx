import { LocationIcon, SearchIcon } from '@/assets/Icons';

import { IconButton, InputBase, Paper, styled } from '@mui/material';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

export interface InputSeachLocationProps {
    handleValue: (value: string) => void;
    width?:string
}

export const CustomInputBase = styled(InputBase)`
    & input::placeholder {
        font-style: italic;
        color:var(--pl-holder)
    }
    & input{
        color:var(--text-df)
    }
`;
export function InputSeachLocation(props: InputSeachLocationProps) {
    const { handleValue,width="60%" } = props;
    const [value, setValue] = useState<string>('');
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleValue(value);
            setValue("")
        }
    };
    return (
        <Paper
            elevation={0}
            component="form"
            sx={{
                p: '2px 0px 2px 10px',
                display: 'flex',
                height: '35px',
                alignItems: 'center',
                width: `${width}`,
                background: 'var(--bg-search)',
                borderRadius: '12px',
            }}
        >
            <SearchIcon color="lightBlue" />
            <CustomInputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    background: 'transparent',
                    fontSize: '0.9rem',
                    color: 'black',
                }}
                placeholder="Search Location.."
                value={value}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
                inputProps={{ 'aria-label': 'search location' }}
                spellCheck={false}
            />
            <IconButton
                sx={{
                    '&:focus': {
                        outline: 'none',
                    },
                }}
                aria-label="search"
            >
                <LocationIcon color="lightBlue" />
            </IconButton>
        </Paper>
    );
}
