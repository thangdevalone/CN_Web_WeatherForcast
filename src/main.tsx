import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
            <SnackbarProvider
                autoHideDuration={3500}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <App />
            </SnackbarProvider>
    </BrowserRouter>
);
