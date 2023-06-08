import { getConfigIconWeather, getIconWeather } from '@/constants';
import { Stack, Typography } from '@mui/material';
export interface BoxForcastItemProps {
    code: number;
    dayText: string;
    tempC: string;
    active: boolean;
    onClick:()=>void;

}

export function BoxForcastItem(props: BoxForcastItemProps){
    const { code, dayText, tempC, active ,onClick} = props;
    return (
        <Stack
            onClick={onClick}
            sx={{
                width: '100%',
                padding: '10px',
                backgroundColor: `${active ? 'var(--bg-ele-blue)' : 'white'}`,
                borderRadius:"20px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                cursor:"pointer"
            }}
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
        >
            <img
                src={`/assets/${getIconWeather(code)}`}
                alt=""
                style={{ ...getConfigIconWeather(code),width:"80%" }}
                
            />
            <Stack direction="column" alignItems="center">
            <Typography sx={{color:`${active ?"white":"var(--text-0)"}`, fontWeight:500}}>{dayText}</Typography>
            <Typography sx={{color:`${active ?"white":"var(--text-0)"}`, fontWeight:500}}>{tempC}&deg;</Typography>
            </Stack>
            

        </Stack>
    );
}
