import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export function CircularIndeterminate() {
    return (
        <Stack
            sx={{
                width: '100vw',
                height: '100vh',
                zIndex: '5000',
                position: 'fixed',
                backgroundColor: `rgba(0,0,0,0.5)`,
                top: '0',
                left: '0',
                color: 'white',
            }}
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress
                sx={{
                    '&.MuiCircularProgress-root': {
                        color: 'white',
                    },
                }}
            />
        </Stack>
    );
}
