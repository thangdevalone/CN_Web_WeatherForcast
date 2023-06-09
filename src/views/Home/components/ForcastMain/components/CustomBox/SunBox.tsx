import { LocationIcon, MoonIcon, SunIcon } from '@/assets/Icons';

import { DeleteOutline, MoreVert } from '@mui/icons-material';
import { Box, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material';
import { amber, yellow } from '@mui/material/colors';
import { ReactNode, useState } from 'react';
import { astroLocal } from '../AstroIndex';

interface SunAlertProps {
    icon: ReactNode;
    text: string;
    time: string;
}

function SunAlert(props: SunAlertProps) {
    const { icon, text, time } = props;
    return (
        <Stack direction="row" alignItems="center">
            {icon}
            <Stack sx={{ ml: '10px' }} direction="column">
                <Typography sx={{ mb: '0px', color: 'var(--text-drop)' }}>{text}</Typography>
                <Typography sx={{ fontSize: '18px', color: 'var(--text-1)' }}>{time}</Typography>
            </Stack>
        </Stack>
    );
}

export interface SunBoxProps {
    sunRise: string;
    id:string;
    location: string;
    sunSet: string;
    setAstro:(newValue:astroLocal[])=>void
}

export function SunBox(props: SunBoxProps) {
    const { sunRise, location, sunSet,id,setAstro } = props;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMore = Boolean(anchorEl);
    const stored = localStorage.getItem('weather_app');
    const parsed = stored ? JSON.parse(stored) : null;
    const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };
    const handleCloseMore = () => {
        setAnchorEl(null);
    };
    const handleRemove=()=>{
        const newAstro=parsed.astro.filter((item:{location:string,id:string})=>item.id!==id)
        setAstro(newAstro)
        localStorage.setItem('weather_app',JSON.stringify({...parsed,astro:newAstro}))
    }
    return (
        <Box
            sx={{
                padding: '10px 15px',
                backgroundColor: `${yellow[50]}`,
                borderRadius: '10px',
                mb: '10px',
                border: `1px solid ${amber[500]}`,
            }}
        >
            <Stack direction="row" justifyContent="space-between" sx={{ mb: '5px' }}>
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
                    onClick={handleClickMore}
                >
                    <MoreVert htmlColor={amber[500]} />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMore}
                    onClose={handleCloseMore}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleRemove}>
                        <ListItemIcon>
                            <DeleteOutline  />
                        </ListItemIcon>
                        <Typography variant="inherit">Remove</Typography>
                    </MenuItem>
                </Menu>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-around">
                <SunAlert
                    icon={<SunIcon sx={{ fontSize: '50px' }} color={amber[500]} />}
                    text="Sunrise"
                    time={sunRise}
                />
                <SunAlert
                    icon={<MoonIcon sx={{ fontSize: '50px' }} color={amber[500]} />}
                    text="Sunset"
                    time={sunSet}
                />
            </Stack>
        </Box>
    );
}
