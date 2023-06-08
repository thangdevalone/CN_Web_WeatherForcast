import { SvgIcon } from '@mui/material';

export interface SunCloudIconProps {
    color: string;
    fontSize?: 'inherit' | 'small' | 'large' | 'medium';
}

export function SunCloudIcon(props: SunCloudIconProps) {
    const { color, fontSize = 'medium' } = props;
    return (
        <SvgIcon fontSize={fontSize}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.5 12C18.5 8.41 15.59 5.5 12 5.5C8.41 5.5 5.5 8.41 5.5 12"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4.98999 4.98999L4.85999 4.85999M19.01 4.98999L19.14 4.85999L19.01 4.98999ZM12 2.07999V2V2.07999ZM2.08002 12H2H2.08002ZM22 12H21.92H22Z"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 15H20"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 18H18"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 21H15"
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
