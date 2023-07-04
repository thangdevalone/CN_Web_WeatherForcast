
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { BoxDivider } from './BoxDivider';
import classes from './styles.module.css';
import { getConfigIconWeather, getIconWeather } from '@/constants';
import { HumIcon, LocationIcon, WindIcon } from '@/assets/Icons';
import { CardWeather } from '@/models';
export interface CurrentCardProps {
    currentCard: CardWeather;
}
export function CurrentCard(props: CurrentCardProps) {
    const { currentCard } = props;
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    const icon=getIconWeather(currentCard.condition.code)

    return (
        <Stack
            flexDirection="column"
            alignItems="center"
            sx={{
                position: 'relative',
                background: 'var(--bg-ele-blue)',
                width: '100%',
                borderRadius: '15px',
                padding: '10px',
                boxSizing: 'border-box',
                boxShadow:
                    '0px -8px 16px rgba(0, 114, 228, 0.1), 8px 0px 16px rgba(0, 114, 228, 0.1),0px 8px 16px rgba(0, 114, 228, 0.1), -8px 0px 16px rgba(0, 114, 228, 0.1)',
            }}
        >
            <Stack
                alignItems="center"
                flexDirection="row"
                sx={{
                    color: 'white',
                    position: 'absolute',
                    left: '15px',
                    top: '15px',
                }}
            >
                <LocationIcon color="white" />
                <Typography sx={{ marginLeft: '5px', fontSize: '18px', fontWeight: '500' }}>
                    {parsed.location}
                </Typography>
            </Stack>
            <img
                src={`/assets/${icon}`}
                alt=""
                style={{ ...getConfigIconWeather(currentCard.condition.code),marginBottom:`${icon==="/RainThunder.png"?"35px":"0px"}` }}
                className={classes.sideBarIcon}
            />
            <Typography
                sx={{
                    color: 'white',
                    fontWeight: '500',
                }}
            >
                {`${dayjs(currentCard.date).format('MM/DD/YYYY')===dayjs(new Date()).format('MM/DD/YYYY')?'Today':dayjs(currentCard.date).format('dddd')}`}, {dayjs(currentCard.date).format('DD MMMM')}
            </Typography>
            <Typography
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '60px',
                    letterSpacing: '3px',
                    fontFamily: 'Arimo',
                }}
            >
                {currentCard.avgtemp_c}&deg;
            </Typography>
            <Typography
                sx={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '500',
                }}
            >
                {currentCard.condition.text}
            </Typography>
            <Stack flexDirection="column" sx={{ mt: '10px' }}>
                <BoxDivider
                    icon={<WindIcon color={'white'} />}
                    leftContent="Wind"
                    rightContent={`${currentCard.maxwind_kph} km/h`}
                />
                <BoxDivider
                    icon={<HumIcon color={'white'} />}
                    leftContent="Hum"
                    rightContent={`${currentCard.avghumidity} %`}
                />
            </Stack>
        </Stack>
    );
}
