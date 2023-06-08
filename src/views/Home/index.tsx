/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack } from '@mui/material';

import { ForcastMain } from './components/ForcastMain';
import { SideBar } from './components/SideBar';
import { useEffect, useState } from 'react';
import forcastApi from '@/src/api/forcastApi';
import { CardWeather } from '@/src/models';

export function Home() {
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    const [currentCard, setCurrentCard] = useState<CardWeather | null>(null);

    const [foreCastDay, setForecastDay] = useState<any>(null);
    const [activeCard, setActiveCard] = useState<number>(0);
    useEffect(() => {
        (async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                const res: any = await forcastApi.getForcast(parsed.location, 7);

                setForecastDay(res.forecast.forecastday);
                setCurrentCard({...res.forecast.forecastday[0].day,date:res.forecast.forecastday[0].date});
            } catch (error) {
                console.log(error);
            }
        })();
    }, [parsed.location]);

    return (
        <Box>
            {currentCard && (
                <>
                    <Stack className="full-box" flexDirection="row">
                        <ForcastMain forecast={foreCastDay} active={activeCard} setActiveCard={setActiveCard} setCurrentCard={setCurrentCard} />
                        <SideBar currentCard={currentCard} />
                    </Stack>
                </>
            )}
        </Box>
    );
}
