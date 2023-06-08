import { LocationIcon, MoonIcon, SunIcon } from '@/src/assets/Icons';

import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { amber, yellow } from '@mui/material/colors';
import { ReactNode } from 'react';

interface SunAlertProps {
    icon: ReactNode;
    text: string;
    time: string;
}

function SunAlert(props: SunAlertProps) {
    const { icon, text, time } = props;
    return (
        <Stack direction="row" alignItems='center'>
            {icon}
            <Stack sx={{ml:"10px"}} direction="column" >
                <Typography sx={{ mb: '0px' ,color: 'var(--text-drop)' }}>{text}</Typography>
                <Typography sx={{ fontSize:"18px", color: 'var(--text-1)' }}>{time}</Typography>
            </Stack>
        </Stack>
    );
}

export interface SunBoxProps {
    sunRise: string;
    location: string;
    sunSet: string;
}

export function SunBox(props: SunBoxProps) {
    const { sunRise, location, sunSet } = props;
    const theme = useTheme();
    return (
        <Box sx={{ padding: '10px 15px', backgroundColor: `${yellow[50]}`, borderRadius: '10px',mb:"10px",border:`1px solid ${amber[500]}` }}>
            <Stack direction="row" justifyContent="space-between" sx={{mb:"5px"}}>
                <Stack alignItems="center" flexDirection="row">
                    <LocationIcon color={theme.palette.csBlue.main} />
                    <Typography
                        sx={{
                            marginLeft: '5px',
                            fontSize: '18px',
                            fontWeight: '500',
                            color: 'var(--text-0)',
                        }}
                    >
                        {location}
                    </Typography>
                </Stack>

                <IconButton
                    sx={{
                        '&:focus': {
                            outline: 'none',
                        },
                    }}
                >
                    <MoreVert htmlColor={amber[500]} />
                </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-around">
                <SunAlert
                    icon={<SunIcon sx={{fontSize:"50px"}} color={amber[500]} />}
                    text="Sunrise"
                    time={sunRise}
                />
                <SunAlert
                    icon={<MoonIcon sx={{fontSize:"50px"}} color={amber[500]} />}
                    text="Sunset"
                    time={sunSet}
                />
            </Stack>
        </Box>
    );
}
