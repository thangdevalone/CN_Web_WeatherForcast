import { AirQualityData } from '@/models';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import classes from './styles.module.css';
import { LocationIcon, WindIcon } from '@/assets/Icons';
import { generateAdvice } from '@/constants';

export interface AirQualityIndexProps {
    airQualityData: AirQualityData;
}

export function AirQualityIndex(props: AirQualityIndexProps) {
    const { airQualityData } = props;
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    const theme = useTheme();
    const res = generateAdvice(airQualityData);
    const handleColor = () => {
        if (res.alert === 'Tốt') {
            return theme.palette.success.light;
        }
        if (res.alert === 'Xấu') {
            return theme.palette.error.light;
        }
        return theme.palette.info.light;
    };
    return (
        <Box className={classes.boxLayOut}>
            <Stack sx={{mb:"10px"}} direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{fontSize:"18px",fontWeight:"500",color:"var(--text-0)"}}>Air Quality Index</Typography>
                <Stack alignItems="center" flexDirection="row">
                    <LocationIcon color={theme.palette.csBlue.main} />
                    <Typography
                        sx={{
                            marginLeft: '5px',
                            fontSize: '18px',
                            fontWeight: '500',
                            color: 'var(--text-drop)',
                        }}
                    >
                        {parsed.location}
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" alignItems="center">
                <WindIcon color={handleColor()} sx={{fontSize:"50px"}} />
                <Stack sx={{ml:"10px"}}>
                    <Typography sx={{fontWeight:"500", color:`${handleColor()}`,fontSize:"18px"}}>{res.alert}</Typography>
                    <Typography sx={{ fontSize: '14px',color:'var(--text-drop)' }}>{res.message}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
