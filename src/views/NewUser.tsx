
import { yupResolver } from '@hookform/resolvers/yup';
import {v4 as uuidv4} from 'uuid';
import { AddPhotoAlternate } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { InputField } from '../components/FormControls';
import { UploadImageField } from '../components/FormControls/UploadImageField';
import { InforForm, InforStorage } from '../models';
import LinearIndeterminate from '../utils/LinearIndeterminate';
import uploadApi from '../api/uploadApi';
export function NewUser() {
    const imageUploadRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loadding, setLoading] = useState(false);
    const navigator = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên'),
        avatar: yup.mixed().required('Cần tải lên ảnh đại diện'),
        location:yup.string().required('Cần nhập vị trí của bạn')
    });


    const form = useForm<InforForm>({
        
        resolver: yupResolver(schema),
    });
    const handleClickUpload = () => {
        if (imageUploadRef.current) {
            imageUploadRef.current.click();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, field: any) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            field.onChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const onSubmit: SubmitHandler<InforForm> = async (data) => {
        const { name, avatar,location } = data;
        try {
            setLoading(true);
            const { data } = await uploadApi.postImg(avatar);
            console.log(data);
            const infor: InforStorage = { name: name, avatar: data.data.url,location:location };
            localStorage.setItem('weather_app_infor', JSON.stringify(infor));
            localStorage.setItem('weather_app', JSON.stringify({mode:'light',astro:[{id:uuidv4(),location:location}],note:[]}));

            setLoading(false);
            navigator('/home', {replace:true})
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Tải ảnh không thành công', { variant: 'error' });
        }
    };

    return (
        <>
            <Dialog open={true}>
                {loadding && <LinearIndeterminate />}

                <DialogTitle id="alert-dialog-title">Nhập thông tin</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{marginBottom:"16px"}}>
                        Chúng tôi cần thu thập thông tin bạn để tăng trải nghiệm người dùng, từ đó
                        đem tới trải nhiệm tốt nhất cho bạn
                    </DialogContentText>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Box>
                                <InputField label="Nhập tên của bạn" name="name" />
                            </Box>
                            <Box>
                                <InputField label="Nhập vị trí bạn muốn dự báo" name="location" />
                            </Box>
                            <Button
                                onClick={handleClickUpload}
                                variant="outlined"
                                startIcon={<AddPhotoAlternate />}
                            >
                                Tải lên ảnh đại diện của bạn
                            </Button>

                            <Box>
                                <UploadImageField
                                    name="avatar"
                                    handleImageChange={handleImageChange}
                                    inputRef={imageUploadRef}
                                />
                            </Box>

                            {previewImage && (
                                <Box sx={{ margin: '10px 0' }}>
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        style={{ objectFit: 'cover' }}
                                        width={200}
                                        height={200}
                                    />
                                </Box>
                            )}
                            <Button
                                type="submit"
                                disabled={loadding}
                                fullWidth
                                sx={{ marginTop: '10px' }}
                                variant="contained"
                            >
                                Save infor
                            </Button>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </>
    );
}
