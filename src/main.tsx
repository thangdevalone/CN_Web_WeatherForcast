import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { theme } from './assets/themes.ts';
import './index.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                autoHideDuration={3500}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </BrowserRouter>
);
