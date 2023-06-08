import { CardWeather, InforStorage } from '@/models';
import { Avatar, Box, IconButton, Stack, styled } from '@mui/material';

import classes from './styles.module.css';
import { InputSeachLocation } from './InputSearchLocation';
import { NotiIcon } from '@/assets/Icons';
import { CurrentCard } from './CurrentCard';
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
}
export function SideBar(props:SideBarProps) {
    const {currentCard}=props
    const localStorageItem = localStorage.getItem('weather_app_infor');
    const user: InforStorage = localStorageItem ? JSON.parse(localStorageItem) : null;
    const handleValue = (value: string) => {
        console.log(value);
    };
    return (
        <Box className={classes.sideBar}>
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
                    <CustomAvatarBase src={user.avatar}  />
                </Stack>
            </Stack>
            <CurrentCard currentCard={currentCard} />
        </Box>
    );
}
