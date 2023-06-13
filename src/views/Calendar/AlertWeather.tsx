import { Box } from "@mui/material";
import styles from './styles.module.css'
export interface AlertWeatherProps {
    dayForecast: Date | string;
}

export function AlertWeather(props: AlertWeatherProps) {
    const { dayForecast } = props;
    console.log(dayForecast)
    return <Box id={styles.alertWeather}> 
        {dayForecast.toString()}
    </Box>;
}
