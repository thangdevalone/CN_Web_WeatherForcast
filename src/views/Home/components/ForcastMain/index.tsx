/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack } from '@mui/material';
import classes from '../styles.module.css';
import { HeaderForcast } from './components/HeaderForcast';
import { BoxForcastItem } from './components/CustomBox/BoxForcastItem';
import dayjs from 'dayjs';
import { CardWeather } from '@/models';
import { AirQualityIndex } from './components/AirQualityIndex';
import { AstroIndex } from './components/AstroIndex';
import { SwitchLightDark } from '@/utils/SwitchLightDark';
export interface ForcastMainProps {
    forecast: any;
    setCurrentCard: (forecast: CardWeather) => void;
    active: number;
    setActiveCard: (newCard: number) => void;
    setMode:(newMode:string)=>void;
}

interface ForecastBoxDay {
    day: {
        condition: { code: number };
        avgtemp_c: string;
    };
    date: string;
    date_epoch: number;
}

export function ForcastMain(props: ForcastMainProps) {
    const { forecast, setCurrentCard, active, setActiveCard,setMode } = props;

    return (
        <Box className={classes.forcastMain}>
            <Box sx={{ position: 'absolute', top: '30px', right: '40px',zIndex:10 }}>
                <SwitchLightDark setMode={setMode}/>
            </Box>
            <HeaderForcast />
            <Stack sx={{ width: '100%', mt: '20px' }} direction="row" spacing={2}>
                {forecast.map((item: ForecastBoxDay, index: number) => {
                    return (
                        <BoxForcastItem
                            onClick={() => {
                                setCurrentCard({
                                    ...forecast[index].day,
                                    date: forecast[index].date,
                                });
                                setActiveCard(index);
                            }}
                            key={item.date_epoch}
                            code={item.day.condition.code}
                            dayText={dayjs(item.date).format('ddd')}
                            tempC={item.day.avgtemp_c}
                            active={index === active}
                        />
                    );
                })}
            </Stack>
            <Stack direction="row" spacing={2} sx={{mt:"20px"}}>
                <Stack direction="column" sx={{width:"50%"}}>
                    <AirQualityIndex  airQualityData={forecast[active].day.air_quality} />
                </Stack>
                <AstroIndex/>
            </Stack>
        </Box>
    );
}
