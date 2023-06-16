/* eslint-disable @typescript-eslint/no-explicit-any */
import calendarApi from '@/api/calendarApi';
import forcastApi from '@/api/forcastApi';
import {
    CalendarIcon,
    HumIcon,
    LocationIcon,
    MoonIcon,
    NotiIcon,
    SunIcon,
    WindIcon,
} from '@/assets/Icons';
import { RainIcon } from '@/assets/Icons/RainIcon';
import { TimeIcon } from '@/assets/Icons/TimeIcon';
import { checkTime, convertMoonPhase, getApp } from '@/constants';
import { InforStorage } from '@/models';
import { CircularIndeterminate } from '@/utils/CircularIndeterminate';
import { InputSeachLocation } from '@/utils/InputSearchLocation';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { ArrowBack, ArrowForwardIosSharp } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography, styled, useTheme } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import useWindowDimensions from '@/hooks/WindowDimensions';
export interface AlertWeatherProps {
    dayForecast: DateSelectArg | null;
    watch: boolean;
    handleClose?: () => void;
}
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '10px',
    marginBottom: '10px',
    backgroundColor: theme.palette.mode === 'dark' ? 'var(--bg-box)' : 'rgba(0, 0, 0, .04)',
    '&:before': {
        display: 'none',
    },
    '& *': {
        color: 'var(--text-df)',
    },
}));

interface CustomAccordionSummaryProps extends AccordionSummaryProps {
    expanded: boolean;
}
const AccordionSummary = styled((props: CustomAccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme, expanded }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'var(--bg-box)' : 'rgba(0, 0, 0, .04)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    borderRadius: expanded ? ' 10px 10px 0px 0px' : '10px',

    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));
function getColor(app: any) {
    return app?.mode === 'dark' ? 'white' : 'black';
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    borderRadius: '0px 0px 10px 10px',
    backgroundColor: 'var(--bg-side-bar)',
}));
function forecastTsx(weather: any) {
    const app = getApp();
    const forecast = weather.forecast.forecastday[0];
    return (
        <>
            <Tooltip title="Ngày dự báo">
                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                    <CalendarIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>
                        {dayjs(forecast.date).format('DD/MM/YYYY')}
                    </Typography>
                </Stack>
            </Tooltip>
            <Tooltip title="Nhiệt độ trung bình">
                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                    <SunIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>{forecast.day.avgtemp_c}&deg;C</Typography>
                </Stack>
            </Tooltip>
            <Tooltip title="Tốc độ gió tối đa">
                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                    <WindIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>{forecast.day.maxwind_kph} km/h</Typography>
                </Stack>
            </Tooltip>
            <Tooltip title="Lượng mưa tổng">
                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                    <RainIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>{forecast.day.totalprecip_mm} mm</Typography>
                </Stack>
            </Tooltip>
            <Tooltip title="Độ ẩm">
                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                    <HumIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>{forecast.day.avghumidity} %</Typography>
                </Stack>
            </Tooltip>
            <Tooltip title="Thời tiết">
                <Stack direction="row" sx={{ cursor: 'default' }}>
                    <NotiIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>{forecast.day.condition.text}</Typography>
                </Stack>
            </Tooltip>
        </>
    );
}
function astroTsx(weather: any) {
    const astro = weather.forecast.forecastday[0].astro;
    const app = getApp();
    return (
        <>
            <Tooltip title="Mặt trời mọc">
                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                    <SunIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>{astro.sunrise}</Typography>
                </Stack>
            </Tooltip>
            <Tooltip title="Mặt trời lặn">
                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                    <MoonIcon color={getColor(app)} />
                    <Typography sx={{ ml: '15px' }}>{astro.sunset}</Typography>
                </Stack>
            </Tooltip>

            <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                <Typography>Hình dạng: </Typography>

                <Typography sx={{ ml: '15px' }}>{convertMoonPhase(astro.moon_phase)}</Typography>
            </Stack>
        </>
    );
}

export function AlertWeather(props: AlertWeatherProps) {
    const { dayForecast, watch, handleClose=()=>{return;} } = props;
    const app = getApp();
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    const { enqueueSnackbar } = useSnackbar();
    const [loadding, setLoading] = useState(false);
    const [value, setValue] = useState<InforStorage>(parsed);
    const [expanded, setExpanded] = useState<Array<boolean>>([true, true, false]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [weather, setWeather] = useState<any>(null);

    const handleChange =
        (panel: number) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
            const curExpanded = [...expanded];
            curExpanded[panel] = newExpanded;
            setExpanded(curExpanded);
        };
    useEffect(() => {
        (async () => {
            try {
                if (dayForecast === null || watch === false) return;
                setLoading(true);
                const res = await calendarApi.getData(
                    value.location,
                    dayjs(dayForecast.startStr).format('YYYY-MM-DD'),
                    checkTime(dayForecast.startStr)
                );
                setLoading(false);
                setWeather(res);
                setExpanded([true, true, false]);
                enqueueSnackbar('Lấy dữ liệu thành công', { variant: 'success' });
            } catch (error: any) {
                console.log(error);
                if (error.error.code === 1009) {
                    enqueueSnackbar(
                        'Thời tiết tương lai chỉ xem được 14 đến 300 ngày trong tương lai',
                        { variant: 'error' }
                    );
                } else {
                    enqueueSnackbar('Có lỗi xảy ra khi lấy dữ liệu thời tiết', {
                        variant: 'error',
                    });
                }
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayForecast, watch, value.location]);
    const handleValue = async (value: string) => {
        try {
            setLoading(true);
            const res: any = await forcastApi.getForcast(value, 7);
            const newValue: InforStorage = { ...parsed, location: res.location.name };
            localStorage.setItem('weather_app_infor', JSON.stringify(newValue));
            setValue(newValue);
            setLoading(false);
            enqueueSnackbar(`Đã chuyển vị trí thành ${res.location.name}`, { variant: 'success' });
        } catch (error) {
            console.log(error);
            setLoading(false);

            enqueueSnackbar('Vị trí muốn tìm ko hợp lệ hoặc không có sẵn', { variant: 'error' });
        }
    };
    const { width } = useWindowDimensions();
    const theme = useTheme();
    return (
        <Box id={styles.alertWeather}>
            {loadding && <CircularIndeterminate />}
            <Stack alignItems='center' justifyContent='space-between' direction='row' sx={{ height: '70px' }}>
                {width > 550 ? (
                    <InputSeachLocation handleValue={handleValue} width="100%" />
                ) : (
                    <>
                        <IconButton aria-label="close drawer" onClick={handleClose}>
                            <ArrowBack
                                htmlColor={`${theme.palette.mode === 'dark' ? 'white' : 'black'}`}
                            />
                        </IconButton>
                        <InputSeachLocation width="80%" handleValue={handleValue} />
                    </>
                )}
            </Stack>

            {weather ? (
                <>
                    <Accordion expanded={expanded[0]} onChange={handleChange(0)}>
                        <AccordionSummary
                            expanded={expanded[0]}
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                        >
                            <Typography>Vị trí</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Tooltip title="Vị trí">
                                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                                    <LocationIcon color={getColor(app)} />
                                    <Typography sx={{ ml: '15px' }}>
                                        {weather.location.name}, {weather.location.country}
                                    </Typography>
                                </Stack>
                            </Tooltip>
                            <Tooltip title="Thời gian hiện tại">
                                <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                                    <TimeIcon color={getColor(app)} />
                                    <Typography sx={{ ml: '15px' }}>
                                        {dayjs(weather.location.localtime).format(
                                            'DD/MM/YYYY hh:mm A'
                                        )}
                                    </Typography>
                                </Stack>
                            </Tooltip>

                            <Stack direction="row" sx={{ mb: '10px', cursor: 'default' }}>
                                <Typography>Kinh Độ: </Typography>
                                <Typography sx={{ ml: '15px' }}>
                                    {weather.location.lon}&deg;
                                </Typography>
                            </Stack>
                            <Stack direction="row" sx={{ cursor: 'default' }}>
                                <Typography>Vĩ độ: </Typography>
                                <Typography sx={{ ml: '15px' }}>
                                    {weather.location.lat}&deg;
                                </Typography>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded[1]} onChange={handleChange(1)}>
                        <AccordionSummary
                            expanded={expanded[1]}
                            aria-controls="panel2d-content"
                            id="panel2d-header"
                        >
                            <Typography>Dữ liệu thời tiết</Typography>
                        </AccordionSummary>
                        <AccordionDetails>{forecastTsx(weather)}</AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded[2]} onChange={handleChange(2)}>
                        <AccordionSummary
                            expanded={expanded[2]}
                            aria-controls="panel3d-content"
                            id="panel3d-header"
                        >
                            <Typography>Dữ liệu thiên văn</Typography>
                        </AccordionSummary>
                        <AccordionDetails>{astroTsx(weather)}</AccordionDetails>
                    </Accordion>
                </>
            ) : (
                <Typography sx={{ color: 'var(--text-0)' }}>
                    Chọn 1 ngày để xem chi tiết thời tiết
                </Typography>
            )}
        </Box>
    );
}
