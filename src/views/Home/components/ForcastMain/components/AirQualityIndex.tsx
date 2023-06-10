import { LocationIcon, WindIcon } from '@/assets/Icons';
import { generateAdvice } from '@/constants';
import { AirQualityData } from '@/models';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { AirBox } from './CustomBox/AirBox';
import classes from './styles.module.css';

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
            return blue[600];
        }
        if (res.alert === 'Không lành mạnh') {
            return orange[600];
        }
        if (res.alert === 'Nguy hiểm') {
            return red[600];
        }
        return green[600];
    };

    const handleBg = (mode: string) => {
        if (mode === 'dark') {
            return 'var(--bg-side-bar)';
        }
        if (res.alert === 'Tốt') {
            return blue[50];
        }
        if (res.alert === 'Không lành mạnh') {
            return orange[50];
        }
        if (res.alert === 'Nguy hiểm') {
            return red[50];
        }
        return green[50];
    };
    const [colorBgAirBox, setColorBgAirBox] = useState<string>(handleBg(theme.palette.mode));
    useEffect(() => {
        const stored = localStorage.getItem('weather_app');
        const app = stored ? JSON.parse(stored) : null;
        setColorBgAirBox(handleBg(app.mode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme.palette.mode]);

    return (
        <Box
            className={classes.boxLayOut}
            sx={{ border: `1px solid ${handleColor()}`, backgroundColor: 'var(--bg-box)' }}
        >
            <Stack
                sx={{ mb: '10px' }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography sx={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-0)' }}>
                    Air Quality Index
                </Typography>
                <Stack alignItems="center" flexDirection="row">
                    <IconButton
                        sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                            cursor: 'default',
                        }}
                        disableRipple={true}
                    >
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
                    </IconButton>
                </Stack>
            </Stack>
            {Object.keys(airQualityData).length !== 0 ? (
                <>
                    <Stack direction="row" alignItems="center">
                        <WindIcon color={handleColor()} sx={{ fontSize: '50px' }} />
                        <Stack sx={{ ml: '10px' }}>
                            <Typography
                                sx={{
                                    fontWeight: '500',
                                    color: `${handleColor()}`,
                                    fontSize: '18px',
                                }}
                            >
                                {res.alert}
                            </Typography>
                            <Typography sx={{ fontSize: '14px', color: 'var(--text-drop)' }}>
                                {res.message}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Box
                        className={classes.boxScrollX}
                        sx={{ width: '100%', overflow: 'auto hidden', pb: '10px' }}
                    >
                        <Stack
                            sx={{ mt: '10px', minWidth: '470px' }}
                            justifyContent="space-between"
                            direction="row"
                        >
                            <AirBox
                                sx={{
                                    backgroundColor: colorBgAirBox,
                                    width: '60px',
                                    border: `1px solid ${handleColor()}`,
                                }}
                                content={airQualityData.pm2_5}
                                label={
                                    <span style={{ color: handleColor() }}>
                                        PM<sub className={classes.subAir}>2</sub>
                                    </span>
                                }
                            />
                            <AirBox
                                sx={{
                                    backgroundColor: colorBgAirBox,
                                    width: '60px',
                                    border: `1px solid ${handleColor()}`,
                                }}
                                content={airQualityData.pm10}
                                label={
                                    <span style={{ color: handleColor() }}>
                                        PM<sub className={classes.subAir}>10</sub>
                                    </span>
                                }
                            />
                            <AirBox
                                sx={{
                                    backgroundColor: colorBgAirBox,
                                    width: '60px',
                                    border: `1px solid ${handleColor()}`,
                                }}
                                content={airQualityData.so2}
                                label={
                                    <span style={{ color: handleColor() }}>
                                        SO<sub className={classes.subAir}>2</sub>
                                    </span>
                                }
                            />
                            <AirBox
                                sx={{
                                    backgroundColor: colorBgAirBox,
                                    width: '60px',
                                    border: `1px solid ${handleColor()}`,
                                }}
                                content={airQualityData.no2}
                                label={
                                    <span style={{ color: handleColor() }}>
                                        NO<sub className={classes.subAir}>2</sub>
                                    </span>
                                }
                            />
                            <AirBox
                                sx={{
                                    backgroundColor: colorBgAirBox,
                                    width: '60px',
                                    border: `1px solid ${handleColor()}`,
                                }}
                                content={airQualityData.o3}
                                label={
                                    <span style={{ color: handleColor() }}>
                                        O<sub className={classes.subAir}>3</sub>
                                    </span>
                                }
                            />
                            <AirBox
                                sx={{
                                    backgroundColor: colorBgAirBox,
                                    width: '60px',
                                    border: `1px solid ${handleColor()}`,
                                }}
                                content={airQualityData.co}
                                label={<span style={{ color: handleColor() }}>CO</span>}
                            />
                        </Stack>
                    </Box>
                </>
            ) : (
                <Box>Chưa được dự báo</Box>
            )}
            <span style={{ color: 'var(--text-drop)', fontSize: '12px' }}>
                Đơn vị đo: μg/m<sup className={classes.subAir}>3</sup>{' '}
                <span style={{ marginLeft: '3px' }}>( Microgram trên mét khối )</span>
            </span>
        </Box>
    );
}
