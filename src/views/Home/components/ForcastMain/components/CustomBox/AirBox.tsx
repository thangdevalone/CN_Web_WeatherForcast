
import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface AirBoxProps {
    content: number;
    label: ReactNode;
    sx: object;
}

export function AirBox(props: AirBoxProps) {
    const { content, label, sx } = props;

    return (
        <Stack
            direction="column"
            alignItems="center"
            sx={{ ...sx, borderRadius: '10px', padding: '8px 5px' }}
        >
            <Typography sx={{ fontWeight: 'bold', color: 'var(--text-0)', mb: '5px' }}>
                {content.toFixed(1)}
            </Typography>
            {label}
        </Stack>
    );
}
