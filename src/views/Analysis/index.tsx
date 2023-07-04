import { Box, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

export function Analysis() {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));
    const {enqueueSnackbar}=useSnackbar()
    const navigator=useNavigate()
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            navigator('/home')
        }, 2000);
        enqueueSnackbar('Tính năng phân tích chưa có trong phiên bản này!',{variant:"error"})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? (
                <Stack className="full-box" alignItems="center" justifyContent="center">
                    <RingLoader color="#83acff" />
                </Stack>
            ) : (
                <Box
                    className="full-box"
                    sx={{
                        padding: '20px 30px',
                        background: 'var(--bg-light)',
                        overflow: 'hidden scroll',
                    }}
                >
                    <Stack>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    format="MM/YYYY"
                                    label="Nhập tháng"
                                    value={value}
                                    slotProps={{
                                        textField: {
                                            helperText: 'Tháng/Năm',
                                        },
                                    }}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Stack>
                    <Box
                        sx={{
                            padding: '15px',
                            mt: '10px',

                            borderRadius: '10px',
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                            background: 'var(--bg-box)',
                        }}
                    >
                        {/* <LineChart res /> */}
                    </Box>
                </Box>
            )}
        </>
    );
}
