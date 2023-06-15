import astroApi from '@/api/astroApi';
import { InputField } from '@/components/FormControls';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline } from '@mui/icons-material';
import {v4 as uuidv4} from 'uuid'
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
import LinearIndeterminate from '@/utils/LinearIndeterminate';
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
export interface astroLocal{
    location:string,
    id:string
}
interface formAddLocation {
    location: string;
}
export interface AstroIndexProps{
    width:string
}
export function AstroIndex(props:AstroIndexProps) {
    const {width}=props
    const stored = localStorage.getItem('weather_app');
    const parsed = stored ? JSON.parse(stored) : null;
    const [astro, setAstro] = useState<astroLocal[]>([...parsed.astro]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
                setLoading(true);
                const apiRequests = astro.map((item: astroLocal) => astroApi.getAstro(item.location));
                const res = await Promise.all(apiRequests);
                const resConvert = res.map((response) => response as unknown as astroDataModel);
                setAstroData(resConvert);
                setOpen(false);
                setLoading(false);
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
        const newAstro = [...astro, {location:value.location,id:uuidv4()}];
        localStorage.setItem('weather_app',JSON.stringify({...parsed,astro:newAstro}))
        setAstro(newAstro);
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                {loading && <LinearIndeterminate />}
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
                                disabled={loading}
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
                                disabled={loading}

                            >
                                Thêm mới
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
            <Box
                className={classes.boxLayOut}
                sx={{ width: `${width}`, maxWidth:"550px", boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' ,backgroundColor:"var(--bg-box)"}}
            >
                <Stack
                    sx={{ mb: '10px', }}
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
                                    id={astro[index]?.id||""}
                                    setAstro={setAstro}
                                />
                            );
                        })}
                    </>
                )}
            </Box>
        </>
    );
}
