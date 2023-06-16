/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputField } from '@/components/FormControls';
import { AreaField } from '@/components/FormControls/AreaField';
import { calculateDateDifference } from '@/constants';
import useWindowDimensions from '@/hooks/WindowDimensions';
import { NoteForm } from '@/models';
import { INITIAL_EVENTS, createEventId } from '@/utils/Event';
import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { yupResolver } from '@hookform/resolvers/yup';
import { CloudOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Drawer,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import * as yup from 'yup';
import { AlertWeather } from './AlertWeather';
import './replace.css';
import styles from './styles.module.css';
interface AppState {
    weekendsVisible: boolean;
    currentEvents: EventApi[];
}

export function Calendar() {
    const [calendarState, setCalendarState] = useState<AppState>({
        weekendsVisible: true,
        currentEvents: [],
    });

    const [open1, setOpen1] = useState<{ selectInfo: DateSelectArg | null; status: boolean }>({
        selectInfo: null,
        status: false,
    });
    const [watch, setWatch] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [dateSelect, setDateSelect] = useState<DateSelectArg | null>(null);
    const { width } = useWindowDimensions();
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();
    const schema = yup.object().shape({
        title: yup.string().required('Cần nhập tiêu đề'),
    });
    const form = useForm<NoteForm>({
        resolver: yupResolver(schema),
    });
    const handleDateSelect = (selectInfo: DateSelectArg | null) => {
        if (selectInfo === null) return;
        setDateSelect(selectInfo);
        form.setValue('start', selectInfo.startStr);
        form.setValue('end', selectInfo.endStr);
        setOpen2(true);
    };
    const handleClose1 = () => {
        setOpen1((oldVal) => ({ ...oldVal, status: !oldVal.status }));
    };
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },2000  )
    },[])
    const handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
            const stored = localStorage.getItem('weather_app');
            const note: Array<any> =
                stored && JSON.parse(stored)?.note ? JSON.parse(stored)?.note : [];
            const newNote = note.filter((item: any) => item?.id !== clickInfo.event.id);
            if (!stored) {
                throw new Error('Có lỗi');
            }

            localStorage.setItem(
                'weather_app',
                JSON.stringify({ ...JSON.parse(stored), note: newNote })
            );
            enqueueSnackbar('Xóa thành công', { variant: 'success' });
        }
    };
    const handleEvents = (events: EventApi[]) => {
        setCalendarState((oldValue) => ({
            currentEvents: events,
            weekendsVisible: oldValue.weekendsVisible,
        }));
    };
    function renderEventContent(eventContent: EventContentArg) {
        return (
            <>
                {eventContent.view.type !== 'dayGridMonth' ? (
                    <Box
                        sx={{
                            padding: '3px 5px',
                            '& *': {
                                fontFamily: 'Roboto,sans-serif',
                                color: 'white !important',
                            },
                        }}
                    >
                        <Typography variant="body1">{eventContent.event.title}</Typography>
                        <Typography variant="body2">{eventContent.timeText}</Typography>

                        {eventContent.event.extendedProps?.desc && (
                            <Typography variant="body2">
                                Mô tả: <i>{eventContent.event.extendedProps.desc}</i>
                            </Typography>
                        )}
                    </Box>
                ) : eventContent.event.allDay ? (
                    <Box
                        sx={{
                            padding: '3px 5px',
                            '& *': {
                                fontFamily: 'Roboto,sans-serif',
                                color: 'white !important',
                            },
                        }}
                    >
                        <Typography noWrap={true} variant="body1">
                            {eventContent.event.title}
                        </Typography>
                    </Box>
                ) : (
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            overflow: 'hidden',
                            width: '100%',
                            borderRadius: '3px',
                            p: '2px 7px',
                            m: '1px 2px',
                        }}
                    >
                        <Box
                            sx={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                mr: '5px',
                                backgroundColor: 'var(--fc-event-bg-color)',
                            }}
                        ></Box>
                        <Typography
                            sx={{ width: 'calc(100% - 15px)' }}
                            noWrap={true}
                            variant="body1"
                        >
                            {eventContent.event.title}
                        </Typography>
                    </Stack>
                )}
            </>
        );
    }

    const configHeaderToolbar = () => {
        if (width > 1000) {
            return {
                left: 'prev,next today',
                center: '',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            };
        }
        if (width < 400) {
            return {
                left: 'prev,next today',
          
                right: 'dayGridMonth,timeGridWeek,timeGridDay title',
            };
        }
        return {
            left: 'prev,next today title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        };
    };
    const handleAddEvent = () => {
        setWatch(false);
        handleClose1();
        handleDateSelect(open1?.selectInfo);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleViewWeather = () => {
        setWatch(true);
        if (!open1.selectInfo) return;
        if (calculateDateDifference(open1.selectInfo.startStr, open1.selectInfo.endStr) !== 1) {
            enqueueSnackbar('Không thể xem thời tiết nhiều ngày hãy chọn 1 ngày', {
                variant: 'warning',
            });
        } else {
            setDateSelect(open1?.selectInfo);
        }
        handleClose1();
    };

    const onSubmit: SubmitHandler<NoteForm> = (data: NoteForm) => {
        if (!dateSelect) return;
        const calendarApi = dateSelect.view.calendar;
        calendarApi.unselect();

        try {
            const e = {
                id: createEventId(),
                ...data,
            };
            calendarApi.addEvent(e);
            const stored = localStorage.getItem('weather_app');
            const note: Array<object> =
                stored && JSON.parse(stored)?.note ? JSON.parse(stored)?.note : [];
            if (!stored) {
                throw new Error('Có lỗi');
            }

            note.push(e);
            localStorage.setItem(
                'weather_app',
                JSON.stringify({ ...JSON.parse(stored), note: note })
            );
            handleClose2();
            enqueueSnackbar('Thêm sự kiện thành công', { variant: 'success' });
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Xảy ra lỗi hãy thử lại', { variant: 'error' });
        }
    };
    const [anchor, setAnchor] = useState(false);
    const handleClose = () => {
        setAnchor(false);
    };
    const handleOpen = () => {
        setAnchor(true);
    };
    return (
        <>
            {loading ? (
                <Stack className="full-box" alignItems="center" justifyContent="center">
                    <RingLoader color="#83acff" />
                </Stack>
            ) : (
                <Stack className="full-box" flexDirection="row">
                    <Dialog maxWidth="sm" open={open1.status}>
                        <DialogTitle>{'Bạn muốn gì?'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <b>Lưu ý: </b> Xem dữ liệu thời tiết chỉ có thể xem được thời tiết
                                tương lai 14 đến 300 ngày, lịch sử 365 ngày tính từ ngày hiện tại
                                đối với api bản pro <br /> ( Xem chi tiết tại:{' '}
                                <Link
                                    to="https://www.weatherapi.com/"
                                    target="_blank"
                                    title="Weather API"
                                >
                                    WeatherAPI.com
                                </Link>{' '}
                                )
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose1}>Hủy</Button>
                            <Button onClick={handleAddEvent}>Thêm sự kiện</Button>
                            <Button onClick={handleViewWeather}>Xem dữ liệu thời tiết</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog maxWidth="sm" open={open2}>
                        <DialogTitle>Thêm 1 sự kiện</DialogTitle>
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <DialogContent sx={{ padding: '0px 24px' }}>
                                    <DialogContentText id="alert-dialog-description">
                                        Chúng tôi không lưu dữ liệu sự kiện của bạn tại cơ sở dữ
                                        liệu, mà lưu tại chính trình duyệt của bạn. Nên bạn hãy yên
                                        tâm về vấn đề bảo mật
                                    </DialogContentText>

                                    <Grid
                                        container
                                        sx={{ mt: 2 }}
                                        rowSpacing={0}
                                        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                sx={{ mb: 2 }}
                                                name="start"
                                                disabled
                                                label="Start At"
                                                value={dayjs(form.getValues('start')).format(
                                                    'DD/MM/YYYY hh:mm A'
                                                )}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                sx={{ mb: 2 }}
                                                name="end"
                                                disabled
                                                label="End At"
                                                value={dayjs(form.getValues('end')).format(
                                                    'DD/MM/YYYY hh:mm A'
                                                )}
                                                variant="filled"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField label="Tiêu đề*" name="title" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AreaField label="Mô tả" name="desc" />
                                        </Grid>
                                    </Grid>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={handleClose2}>Hủy</Button>
                                    <Button type="submit">Thêm</Button>
                                </DialogActions>
                            </form>
                        </FormProvider>
                    </Dialog>
                    <Box
                        className="main-calendar"
                        sx={{
                            mb: `${width < 550 ? '60px' : '0px'}`,
                            p: `${width > 550 ? '30px 40px' : '20px 30px'}`,
                        }}
                        id={styles.calendar}
                    >
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={configHeaderToolbar()}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dragScroll={true}
                            longPressDelay={500}
                            selectLongPressDelay={500}
                            dayMaxEvents={true}
                            allDayContent="All day"
                            nowIndicator={true}
                            dayHeaderFormat={{ weekday: `${width > 1100 ? 'long' : 'short'}` }}
                            titleFormat={{
                                year: 'numeric',
                                month: 'long',
                                day: (() => (width > 1000 ? 'numeric' : undefined))(),
                            }}
                            weekends={calendarState.weekendsVisible}
                            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                            select={(selectInfo: DateSelectArg) => {
                                setOpen1({ selectInfo: selectInfo, status: true });
                            }}
                            eventContent={renderEventContent} // custom render function
                            eventClick={handleEventClick}
                            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            
            */
                        />
                    </Box>
                    {width > 700 ? (
                        <AlertWeather watch={watch} dayForecast={dateSelect} />
                    ) : (
                        <>
                            <Drawer open={anchor} anchor="right" onClose={handleClose}>
                                <AlertWeather handleClose={handleClose} watch={watch} dayForecast={dateSelect} />
                            </Drawer>
                            <IconButton
                                aria-label="open drawer"
                                onClick={handleOpen}
                                sx={{
                                    position: 'absolute',
                                    bottom: `${width > 550 ? '40px' : '80px'}`,
                                    right: `${width > 550 ? '30px' : 'unset'}`,
                                    left: `${width < 550 && '10px'}`,
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '100%',
                                    zIndex:"10",
                                    '&:hover': {
                                        backgroundColor: blue['A100'],
                                    },
                                    backgroundColor: blue['A100'],

                                    boxShadow:
                                        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                                }}
                            >
                                <CloudOutlined htmlColor="white" />
                            </IconButton>
                        </>
                    )}
                </Stack>
            )}
        </>
    );
}
