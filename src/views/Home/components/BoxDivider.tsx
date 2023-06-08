import { Box, Divider, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
export interface BoxDividerProps {
    icon: ReactNode;
    leftContent: string;
    rightContent: string;
}

export function BoxDivider(props: BoxDividerProps) {
    const { icon, leftContent, rightContent } = props;
    return (
        <Stack
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{
                color: 'white',
                mb: '8px',
            }}
        >
            <Box sx={{ mr: '8px' }}>{icon}</Box>
            <Typography sx={{mr: '20px'}}>{leftContent}</Typography>
            <Divider
                sx={{ mr: '20px', borderColor: 'white', mt: '5px', borderWidth: '1px' }}
                orientation="vertical"
                variant="middle"
                flexItem
            />
            <Typography>{rightContent}</Typography>
        </Stack>
    );
}
