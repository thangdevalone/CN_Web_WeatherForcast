import astroApi from '@/src/api/astroApi';
import { InputField } from '@/src/components/FormControls';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { SunBox } from './CustomBox/SunBox';
import classes from './styles.module.css';
interface astroDataModel {
    location: {
        country: string;
        name: string;
    };
    astronomy: {
        astro: {
            sunrise: string;
            sunset: string;
        };
    };
}
interface formAddLocation {
    location: string;
}
export function AstroIndex() {
    const stored = localStorage.getItem('weather_app');
    const parsed = stored ? JSON.parse(stored) : null;
    const [astro, setAstro] = useState([...parsed.astro]);
    const [open, setOpen] = useState(false);
    const schema = yup.object().shape({
        location: yup.string().required('Cần nhập tên thành phố'),
    });

    const form = useForm<formAddLocation>({
        resolver: yupResolver(schema),
    });
    const [astroData, setAstroData] = useState<Array<astroDataModel> | []>([]);
    useEffect(() => {
        (async () => {
            try {
                const apiRequests = astro.map((item: string) => astroApi.getAstro(item));
                const res = await Promise.all(apiRequests);
                const resConvert = res.map((response) => response as unknown as astroDataModel);
                setAstroData(resConvert);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [astro]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddLocation: SubmitHandler<formAddLocation> = (value) => {
        console.log(value);
        const newAstro=[...astro,value.location]
        setAstro(newAstro)
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleAddLocation)}>
                        <DialogTitle>Thêm dữ liệu thiên văn</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{ mb: '10px' }}>
                                Nhập tên thành phố chính xác, để chúng tôi có thể lấy được dữ liệu
                                đúng đắn
                            </DialogContentText>
                            <InputField label="Nhập thành phố muốn thêm" name="location" />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                sx={{
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }}
                                onClick={handleClose}
                            >
                                Hủy
                            </Button>
                            <Button
                                sx={{
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }}
                                type="submit"
                            >
                                Thêm mới
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
            <Box className={classes.boxLayOut} sx={{ width: '50%' ,boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
                <Stack
                    sx={{ mb: '10px' }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        sx={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-0)' }}
                    >
                        Sunrise & Sunset
                    </Typography>

                    <Stack alignItems="center" flexDirection="row">
                        <IconButton
                            sx={{
                                '&:focus': {
                                    outline: 'none',
                                },
                            }}
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <AddCircleOutline htmlColor="lightBlue" />
                        </IconButton>
                    </Stack>
                </Stack>
                {astroData.length !== 0 && (
                    <>
                        {astroData.map((item, index) => {
                            return (
                                <SunBox
                                    key={item.location.name || index}
                                    sunRise={item.astronomy.astro.sunrise}
                                    sunSet={item.astronomy.astro.sunset}
                                    location={`${item.location.name}, ${item.location.country}`}
                                />
                            );
                        })}
                    </>
                )}
            </Box>
        </>
    );
}
