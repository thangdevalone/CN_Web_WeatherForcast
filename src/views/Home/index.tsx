import { Box, Stack } from '@mui/material';

import { useState } from 'react';
import { ForcastMain } from './components/ForcastMain';
import { SideBar } from './components/SideBar';

export function Home() {
    const stored = localStorage.getItem('weather_app');
    const parsed = stored ? JSON.parse(stored) : '';
    const [locate, setLocate] = useState(parsed.locate);
    const [name, setName] = useState(parsed.name);

    return (
        <Box>
            <Stack className="full-box" flexDirection="row">
                <ForcastMain />
                <SideBar />
            </Stack>
        </Box>
    );
}
