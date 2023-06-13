import { Avatar, Box, IconButton, Stack, styled } from '@mui/material';

import classes from './styles.module.css';
import { InputSeachLocation } from './InputSearchLocation';

import { CurrentCard } from './CurrentCard';
import { CardWeather, InforStorage } from '@/models';
import { NotiIcon } from '@/assets/Icons';
import { useSnackbar } from 'notistack';
import forcastApi from '@/api/forcastApi';
import { CircularIndeterminate } from '@/utils/CircularIndeterminate';
import { useState } from 'react';
const CustomAvatarBase = styled(Avatar)`
    & {
        border-radius: 12px;
        cursor: pointer;
        width: 45px;
        height: 45px;
        margin-left: 15px;
        transition: all 0.25s;
        box-shadow: 0px -8px 24px rgba(0, 114, 228, 0.1), 8px 0px 24px rgba(0, 114, 228, 0.1),
            0px 8px 24px rgba(0, 114, 228, 0.1), -8px 0px 24px rgba(0, 114, 228, 0.1);
    }
    &:hover {
        filter: brightness(80%);
    }
`;

export interface SideBarProps {
    currentCard: CardWeather;
    setValue: (newValue: InforStorage) => void;
}
export function SideBar(props: SideBarProps) {
    const { currentCard, setValue } = props;
    const localStorageItem = localStorage.getItem('weather_app_infor');
    const user: InforStorage = localStorageItem ? JSON.parse(localStorageItem) : null;
    const { enqueueSnackbar } = useSnackbar();
    const [loadding, setLoading] = useState(false);
    const handleValue = async (value: string) => {
        try {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
            const res: any = await forcastApi.getForcast(value, 7);
            const newValue: InforStorage = { ...user, location: res.location.name };
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
        <Box className={classes.sideBar} sx={{ backgroundColor: 'var(--bg-side-bar)' }}>
            {loadding && <CircularIndeterminate />}
            <Stack
                className="header"
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                sx={{ width: '100%', height: '70px', mt: '0px', mb: '15px' }}
            >
                <InputSeachLocation handleValue={handleValue} />
                <Stack flexDirection="row" alignItems="center">
                    <IconButton
                        sx={{
                            '&:focus': {
                                outline: 'none',
                            },
                        }}
                    >
                        <NotiIcon color="lightBlue" />
                    </IconButton>
                    <CustomAvatarBase src={user.avatar} />
                </Stack>
            </Stack>
            <CurrentCard currentCard={currentCard} />
        </Box>
    );
}
