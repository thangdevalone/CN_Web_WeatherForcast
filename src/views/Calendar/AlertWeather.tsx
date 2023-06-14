import calendarApi from '@/api/calendarApi';
import forcastApi from '@/api/forcastApi';
import { checkTime } from '@/constants';
import { InforStorage } from '@/models';
import { CircularIndeterminate } from '@/utils/CircularIndeterminate';
import { InputSeachLocation } from '@/utils/InputSearchLocation';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { ArrowForwardIosSharp } from '@mui/icons-material';
import { Box, Stack, Typography, styled } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { SyntheticEvent, useEffect, useState } from 'react';
import styles from './styles.module.css';
export interface AlertWeatherProps {
    dayForecast: DateSelectArg | null;
}
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function AlertWeather(props: AlertWeatherProps) {
    const { dayForecast } = props;
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    const { enqueueSnackbar } = useSnackbar();
    const [loadding, setLoading] = useState(false);
    const [value, setValue] = useState<InforStorage>(parsed);
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        (async () => {
            try {
                if (dayForecast === null) return;
                const res = await calendarApi.getData(
                    parsed.location,
                    dayjs(dayForecast.startStr).format('YYYY-MM-DD'),
                    checkTime(dayForecast.startStr)
                );
                console.log(res);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayForecast]);
    const handleValue = async (value: string) => {
        try {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
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
    return (
        <Box id={styles.alertWeather}>
            {loadding && <CircularIndeterminate />}
            <Stack justifyContent="center" sx={{ height: '70px' }}>
                <InputSeachLocation handleValue={handleValue} width="100%" />
            </Stack>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Collapsible Group Item #1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Collapsible Group Item #2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Collapsible Group Item #3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                        amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
