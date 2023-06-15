/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, IconButton, Stack } from '@mui/material';

import forcastApi from '@/api/forcastApi';
import useWindowDimensions from '@/hooks/WindowDimensions';
import { CardWeather, InforStorage } from '@/models';
import { WbSunnyOutlined } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { ForcastMain } from './components/ForcastMain';
import { SideBar } from './components/SideBar';

export interface HomeProps {
    setMode: (newMode: string) => void;
}

export function Home({ setMode }: HomeProps) {
    const stored = localStorage.getItem('weather_app_infor');
    const [parsed, setParsed] = useState<InforStorage>(stored && JSON.parse(stored));
    const [currentCard, setCurrentCard] = useState<CardWeather | null>(null);
    const [foreCastDay, setForecastDay] = useState<any>(null);
    const [activeCard, setActiveCard] = useState<number>(0);
    const [anchor, setAnchor] = useState(false);
    const handleClose = () => {
        setAnchor(false);
    };
    const handleOpen = () => {
        setAnchor(true);
    };
    useEffect(() => {
        (async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                const res: any = await forcastApi.getForcast(parsed.location, 7);
                localStorage.setItem(
                    'weather_app_infor',
                    JSON.stringify({ ...parsed, location: res.location.name })
                );
                setForecastDay(res.forecast.forecastday);
                setCurrentCard({
                    ...res.forecast.forecastday[0].day,
                    date: res.forecast.forecastday[0].date,
                });
            } catch (error) {
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parsed.location]);
    const { width } = useWindowDimensions();
    return (
        <>
            {currentCard && (
                <>
                    <Stack
                        className="full-box"
                        flexDirection="row"
                    >
                        <ForcastMain
                            setMode={setMode}
                            forecast={foreCastDay}
                            active={activeCard}
                            setActiveCard={setActiveCard}
                            setCurrentCard={setCurrentCard}
                        />
                        {width > 700 ? (
                            <SideBar currentCard={currentCard} setValue={setParsed} />
                        ) : (
                            <>
                                <Drawer open={anchor} anchor="right" onClose={handleClose}>
                                    <SideBar
                                        handleClose={handleClose}
                                        currentCard={currentCard}
                                        setValue={setParsed}
                                    />
                                </Drawer>
                                <IconButton
                                    aria-label="open drawer"
                                    onClick={handleOpen}
                                    sx={{
                                        position: 'absolute',
                                        bottom: `${width > 550 ? '40px' : '80px'}`,
                                        right: `${width > 550 && '30px'}`,
                                        left: `${width < 550 && '10px'}`,
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '100%',
                                        '&:hover': {
                                            backgroundColor: blue['A100'],
                                        },
                                        backgroundColor: blue['A100'],

                                        boxShadow:
                                            'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                                    }}
                                >
                                    <WbSunnyOutlined htmlColor="white" />
                                </IconButton>
                            </>
                        )}
                    </Stack>
                </>
            )}
        </>
    );
}
