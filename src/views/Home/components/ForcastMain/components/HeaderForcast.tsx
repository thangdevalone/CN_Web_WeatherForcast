
import { MoonIcon, SunCloudIcon, SunIcon } from '@/src/assets/Icons';
import { InforStorage } from '@/src/models';
import { SwitchLightDark } from '@/src/utils/SwitchLightDark';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function HeaderForcast() {
    const localStorageItem = localStorage.getItem('weather_app_infor');
    const user: InforStorage = localStorageItem ? JSON.parse(localStorageItem) : null;
    const theme = useTheme();
    const [currentTime, setCurrentTime] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        marginBottom: '5px',
                        color: 'var(--text-1)',
                        fontWeight: '500',
                        letterSpacing: '1.5px',
                        fontFamily: 'Arimo',
                    }}
                >
                    {currentTime.format('hh:mm A')}
                </Typography>
                <Typography
                    sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'Lato',color:"var(--text-0)" }}
                    gutterBottom
                >
                    {currentTime.format('dddd, DD MMMM, YYYY')}
                </Typography>
                <Stack sx={{ marginTop: '10px' }} alignItems="center" flexDirection="row">
                    {currentTime.hour() < 12 && currentTime.hour() > 0 && (
                        <SunCloudIcon color={theme.palette.csBlue.main} fontSize="large" />
                    )}
                    {currentTime.hour() >= 12 && currentTime.hour() < 18 && (
                        <SunIcon color={theme.palette.csBlue.main} fontSize="large" />
                    )}
                    {currentTime.hour() >= 18 && currentTime.hour() <= 23 && (
                        <MoonIcon color={theme.palette.csBlue.main} fontSize="large" />
                    )}
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: '500',
                            fontSize: '1.5rem',
                            marginLeft: '10px',
                            color: 'var(--text-1)',
                        }}
                    >
                        {currentTime.hour() < 12 &&
                            currentTime.hour() > 0 &&
                            `Good Morning, ${user.name}!`}
                        {currentTime.hour() >= 12 &&
                            currentTime.hour() < 18 &&
                            `Good Afternoon, ${user.name}!`}
                        {currentTime.hour() >= 18 &&
                            currentTime.hour() <= 23 &&
                            `Good Night, ${user.name}!`}
                    </Typography>
                </Stack>
            </Box>
            <Box sx={{ position: 'absolute', top: '0px', right: '20px' }}>
                <SwitchLightDark />
            </Box>
        </Box>
    );
}
