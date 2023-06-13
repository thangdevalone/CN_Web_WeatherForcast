import { InputField } from '@/components/FormControls';
import { AreaField } from '@/components/FormControls/AreaField';
import useWindowDimensions from '@/hooks/WindowDimensions';
import { NoteForm } from '@/models';
import { INITIAL_EVENTS, createEventId } from '@/utils/Event';
import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { AlertWeather } from './AlertWeather';
import './replace.css';
import styles from './styles.module.css';
import { useSnackbar } from 'notistack';
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
    const [open2, setOpen2] = useState(false);
    const [dateClick, setDateClick] = useState<Date | string>(new Date());
    const [dateSelect, setDateSelect] = useState<DateSelectArg | null>(null);
    const { width } = useWindowDimensions();
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
    const handleEventClick = (clickInfo: EventClickArg) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
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
            <Box sx={{"& *":{
              fontFamily:'"Roboto",sans-serif"',
            }}}>
                <Typography variant='body1'>{eventContent.event.title}</Typography>
                <Typography variant='body2'>{eventContent.timeText}</Typography>
         
            </Box>
        );
    }

    const configHeaderToolbar = () => {
        if (width > 1000) {
            return {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            };
        }
        return {
            left: 'prev,next today title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        };
    };
    const handleAddEvent = () => {
        console.log('add');
        handleClose1();
        handleDateSelect(open1?.selectInfo);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleViewWeather = () => {
        console.log('view');
        handleClose1();
    };

    const onSubmit: SubmitHandler<NoteForm> = (data: NoteForm) => {
        if (!dateSelect) return;
        const calendarApi = dateSelect.view.calendar;
        calendarApi.unselect();

        try {
            calendarApi.addEvent({
                id: createEventId(),
                ...data,
            });
            handleClose2();
            enqueueSnackbar('Thêm sự kiện thành công', { variant: 'success' });

        } catch (error) {
            console.log(error);
            enqueueSnackbar('Xảy ra lỗi hãy thử lại', { variant: 'error' });
        }
    };
    return (
        <Stack className="full-box" flexDirection="row">
            <Dialog maxWidth="sm" open={open1.status}>
                <DialogTitle>{'Bạn muốn gì?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>Lưu ý: </b> Xem dữ liệu thời tiết chỉ có thể xem được thời tiết dự báo
                        trước <b>300 ngày</b>, lịch sử <b>365 ngày</b> tính từ ngày hiện tại đối với
                        api bản pro ( Xem chi tiết tại:{' '}
                        <Link to="https://www.weatherapi.com/" target="_blank" title="Weather API">
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
                                Chúng tôi không lưu dữ liệu sự kiện của bạn tại cơ sở dữ liệu, mà
                                lưu tại chính trình duyệt của bạn. Nên bạn hãy yên tâm về vấn đề bảo
                                mật
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
            <div className="main-calendar" id={styles.calendar}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={configHeaderToolbar()}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
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
            </div>
            <AlertWeather dayForecast={dateClick} />
        </Stack>
    );
}
