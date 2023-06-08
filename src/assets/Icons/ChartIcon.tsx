import { SvgIcon } from '@mui/material';

export interface ChartIconProps {
    color: string;
    fontSize?: 'inherit' | 'small' | 'large' | 'medium';
}

export function ChartIcon(props: ChartIconProps) {
    const { color, fontSize = 'medium' } = props;
    return (
        <SvgIcon fontSize={fontSize}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 2V19C2 20.66 3.34 22 5 22H22"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 17L9.59 11.64C10.35 10.76 11.7 10.7 12.52 11.53L13.47 12.48C14.29 13.3 15.64 13.25 16.4 12.37L21 7"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </SvgIcon>
    );
}
