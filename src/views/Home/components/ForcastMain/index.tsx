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
import classNames from 'classnames';
import useWindowDimensions from '@/hooks/WindowDimensions';
export interface ForcastMainProps {
    forecast: any;
    setCurrentCard: (forecast: CardWeather) => void;
    active: number;
    setActiveCard: (newCard: number) => void;
    setMode: (newMode: string) => void;
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
    const { forecast, setCurrentCard, active, setActiveCard, setMode } = props;
    const {width}=useWindowDimensions()
    return (
        
 
    <Box sx={{ mb: `${width < 550 ? '60px' : '0px'}`, p:`${width > 550 ? '30px 40px' :  '20px 30px'}` }} className={classNames({ boxScrollY: true, [classes.forcastMain]: true })}>
            <Box sx={{ position: 'absolute', top: `${width > 550 ? '30px ' :  '20px'}`, right: `${width > 550 ? '40px ' :  '10px'}`, zIndex: 10 }}>
                <SwitchLightDark setMode={setMode} />
            </Box>
            <HeaderForcast />
            <Stack
                className="boxScrollX"
                sx={{ width: '100%', mt: '20px', overflow: 'auto hidden', p: '5px  5px 10px 5px' }}
                direction="row"
                spacing={2}
            >
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
            <Stack direction={`${width>1200?"row":"column"}`} alignItems={"center"} spacing={2} sx={{ mt: '20px' }}>
                <Stack direction="column" sx={{ width: `${width>1200?"50%":"100%"}`, maxWidth:"550px" }}>
                    <AirQualityIndex airQualityData={forecast[active].day.air_quality} />
                </Stack>
                <AstroIndex width={`${width>1200?"50%":"100%"}`} />
            </Stack>
        </Box>
    );
}
