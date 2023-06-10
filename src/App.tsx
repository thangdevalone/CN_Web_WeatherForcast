import { Box } from '@mui/material';
import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectAuth } from './components/ProtectAuth';
import { ProtectRoute } from './components/ProtectRoute';
import { Analysis } from './views/Analysis';
import { Calendar } from './views/Calendar';
import { Home } from './views/Home';
import { Location } from './views/Location';
import { NewUser } from './views/NewUser';
import { Setting } from './views/Setting';
import { useState, useEffect } from 'react';
function App() {
    const stored = localStorage.getItem('weather_app');
    const parsed = stored ? JSON.parse(stored) : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [mode, setMode] = useState<string>(parsed.mode);
    useEffect(() => {
        if (mode === 'light') {
            document.body.classList.add('light');
        } else {
            document.body.classList.add('dark');
        }
    }, [mode]);
    return (
        <Box sx={{ position: 'relative' }}>
            <Routes>
                <Route path="/" element={<ProtectRoute />}>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home setMode={setMode} />} />
                    <Route path="/location" element={<Location />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/analysis" element={<Analysis />} />
                    <Route path="/setting" element={<Setting />} />
                </Route>
                <Route path="/" element={<ProtectAuth />}>
                    <Route path="/infor" element={<NewUser />} />
                </Route>
            </Routes>
        </Box>
    );
}

export default App;
