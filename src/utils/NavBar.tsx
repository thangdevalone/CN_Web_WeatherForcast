import { Box, List, ListItemButton, styled } from '@mui/material';
import classes from './style.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarIcon, ChartIcon, DashBoardIcon, LocationIcon, SettingIcon } from '../assets/Icons';
import { useState, useEffect } from 'react';

const ListItemButtonCustom = styled(ListItemButton)(() => ({
    '&.Mui-selected': {
        backgroundColor: 'var(--bg-item-selected)',
    },
    '&.Mui-selected:hover': {
        backgroundColor: 'var(--bg-item-selected)',
    },
}));

export function NavBar() {
    const location = useLocation();
    const [navActive, setNavActive] = useState<string>('');
    const navigate = useNavigate();
    useEffect(() => {
        setNavActive(location.pathname);
    }, [location.pathname]);
    const handleNav = (nav: string) => {
        if (location.pathname !== nav) {
            setNavActive(nav);
            navigate(nav);
        }
    };
    return (
        <List
            sx={{
                position: 'absolute',
                top: '50%',
                padding: 0,
                zIndex: 7,
                borderRadius: '15px',
                transform: 'translate(-50px,-50%)',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translate(0px,-50%)',
                },
                '&::before': {
                    display: 'block',
                    content: '""',
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    top: '-30px',
                    transition: 'all 0.25s',
                    left: '0px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    boxShadow: `${
                        location.pathname === '/home'
                            ? '-15px 18px var(--bg-item-selected)'
                            : '-15px 18px var(--bg-ele-blue)'
                    }`,
                },
                '&::after': {
                    display: 'block',
                    content: '""',
                    position: 'absolute',
                    width: '30px',
                    transition: 'all 0.25s',

                    height: '30px',
                    bottom: '-30px',
                    left: '0px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    boxShadow: `${
                        location.pathname === '/setting'
                            ? '-18px -15px var(--bg-item-selected)'
                            : '-18px -15px var(--bg-ele-blue)'
                    }`,
                },
                left: '0px',

                boxShadow:
                    'rgba(0, 114, 228, 0.1) 0px -8px 24px, rgba(0, 114, 228, 0.1) 8px 0px 24px, rgba(0, 114, 228, 0.1) 0px 8px 24px',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    zIndex: 8,
                    backgroundColor: 'var(--bg-ele-blue)',
                }}
            >
                <ListItemButtonCustom
                    className={classes.boxIconNav}
                    onClick={() => handleNav('/home')}
                    selected={navActive === '/home'}
                >
                    <DashBoardIcon color="white" />
                </ListItemButtonCustom>
                <ListItemButtonCustom
                    className={classes.boxIconNav}
                    onClick={() => handleNav('/location')}
                    selected={navActive === '/location'}
                >
                    <LocationIcon color="white" />
                </ListItemButtonCustom>
                <ListItemButtonCustom
                    className={classes.boxIconNav}
                    onClick={() => handleNav('/calendar')}
                    selected={navActive === '/calendar'}
                >
                    <CalendarIcon color="white" />
                </ListItemButtonCustom>
                <ListItemButtonCustom
                    className={classes.boxIconNav}
                    onClick={() => handleNav('/analysis')}
                    selected={navActive === '/analysis'}
                >
                    <ChartIcon color="white" />
                </ListItemButtonCustom>
                <ListItemButtonCustom
                    className={classes.boxIconNav}
                    onClick={() => handleNav('/setting')}
                    selected={navActive === '/setting'}
                >
                    <SettingIcon color="white" />
                </ListItemButtonCustom>
            </Box>
        </List>
    );
}
