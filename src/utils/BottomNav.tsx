import {
    AnalyticsOutlined,
    CalendarMonth,
    DashboardCustomizeOutlined,
    SettingsOutlined
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function BottomNav() {
    const [value, setValue] = useState('recents');
    const location = useLocation();
    const navigate = useNavigate();
    const handleChange = (_event: SyntheticEvent, nav: string) => {
        if (location.pathname !== nav) {
            setValue(nav);
            navigate(nav);
        }
    };
    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    return (
        <BottomNavigation
            sx={{
                backgroundColor: 'var(--bg-box)',
                boxShadow: '1px -1px 20px -6px var(--bx-sd)',
                width: '100vw',
                height: '60px',
                position: 'fixed',
                bottom: 0,
                zIndex: 10,
                left: 0,
            }}
            value={value}
            onChange={handleChange}
        >
            <BottomNavigationAction
                sx={{
                    minWidth: 'unset',
                    '&.Mui-selected': {
                        backgroundColor: 'var(--nav-active)',
                    },
                }}
                value="/home"
                icon={<DashboardCustomizeOutlined />}
            />

            <BottomNavigationAction
                sx={{
                    minWidth: 'unset',
                    '&.Mui-selected': {
                        backgroundColor: 'var(--nav-active)',
                    },
                }}
                value="/calendar"
                icon={<CalendarMonth color="inherit" />}
            />
            <BottomNavigationAction
                sx={{
                    minWidth: 'unset',
                    '&.Mui-selected': {
                        backgroundColor: 'var(--nav-active)',
                    },
                }}
                value="/analysis"
                icon={<AnalyticsOutlined color="inherit" />}
            />
            <BottomNavigationAction
                sx={{
                    minWidth: 'unset',
                    '&.Mui-selected': {
                        backgroundColor: 'var(--nav-active)',
                    },
                }}
                value="/setting"
                icon={<SettingsOutlined color="inherit" />}
            />
        </BottomNavigation>
    );
}
