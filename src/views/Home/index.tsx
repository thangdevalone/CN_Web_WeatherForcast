/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack } from '@mui/material';

import { ForcastMain } from './components/ForcastMain';
import { SideBar } from './components/SideBar';
import { useEffect, useState } from 'react';
import forcastApi from '@/api/forcastApi';
import { CardWeather, InforStorage } from '@/models';

export interface HomeProps{
    setMode:(newMode:string)=>void
}

export function Home({setMode}:HomeProps) {
    const stored = localStorage.getItem('weather_app_infor');
    const [parsed,setParsed] = useState<InforStorage>(stored && JSON.parse(stored) );
    const [currentCard, setCurrentCard] = useState<CardWeather | null>(null);
    const [foreCastDay, setForecastDay] = useState<any>(null);
    const [activeCard, setActiveCard] = useState<number>(0);
    useEffect(() => {
        (async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                const res: any = await forcastApi.getForcast(parsed.location, 7);
                localStorage.setItem('weather_app_infor',JSON.stringify({...parsed,location:res.location.name}))
                setForecastDay(res.forecast.forecastday);
                setCurrentCard({...res.forecast.forecastday[0].day,date:res.forecast.forecastday[0].date});
            } catch (error) {
                console.log(error);
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsed.location]);

    return (
        <Box>
            {currentCard && (
                <>
                    <Stack className="full-box" flexDirection="row">
                        <ForcastMain setMode={setMode} forecast={foreCastDay} active={activeCard} setActiveCard={setActiveCard} setCurrentCard={setCurrentCard} />
                        <SideBar  currentCard={currentCard} setValue={setParsed} />
                    </Stack>
                </>
            )}
        </Box>
    );
}
