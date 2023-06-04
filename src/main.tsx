import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <SnackbarProvider  autoHideDuration={3000} anchorOrigin={{ horizontal: 'right', vertical: 'top'}}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>
);
