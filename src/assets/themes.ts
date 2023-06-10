declare module '@mui/material/styles' {
    interface Palette {
        lightBlue: Palette['primary'];
    }
    interface PaletteOptions {
        lightBlue: PaletteOptions['primary'];
    }
    interface Palette {
        csBlue: Palette['primary'];
    }
    interface PaletteOptions {
        csBlue: PaletteOptions['primary'];
    }
    interface Palette {
        csWhite: Palette['primary'];
    }
    interface PaletteOptions {
        csWhite: PaletteOptions['primary'];
    }
}
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        
        lightBlue: {
            main: '#A3C2FF',
        },
        csBlue: {
            main: '#6291F8',
        },
        csWhite: {
            main: '#fff',
        },

        mode: localStorage.getItem('weather_app')
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              JSON.parse(localStorage.getItem('weather_app')!).mode
            : 'light',
    },
});
