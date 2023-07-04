import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectAuth } from './components/ProtectAuth';
import { ProtectRoute } from './components/ProtectRoute';
import { Analysis } from './views/Analysis';
import { Calendar } from './views/Calendar';
import { Home } from './views/Home';
import { NewUser } from './views/NewUser';
import { Setting } from './views/Setting';
import { useState, useEffect } from 'react';
import { initTheme, updateThemeMode } from './assets/themes';

function App() {
    const stored = localStorage.getItem('weather_app');
    const parsed = stored ? JSON.parse(stored) : null;
    const [theme, setTheme] = useState(initTheme);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [mode, setMode] = useState<string>(parsed?.mode || 'light');
    useEffect(() => {
        if (mode === 'light') {
            document.body.classList.add('light');
            setTheme(updateThemeMode('light'));
        } else {
            document.body.classList.add('dark');
            setTheme(updateThemeMode('dark'));
        }
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ position: 'relative' ,width:"100vw",height:"100vh"}}>
                <Routes>
                    <Route path="/" element={<ProtectRoute />}>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home setMode={setMode} />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/analysis" element={<Analysis />} />
                        <Route path="/setting" element={<Setting />} />
                    </Route>
                    <Route path="/" element={<ProtectAuth />}>
                        <Route path="/infor" element={<NewUser />} />
                    </Route>
                </Routes>
            </Box>
        </ThemeProvider>
    );
}

export default App;
