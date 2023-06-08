import { Box } from '@mui/material';
import './App.css';

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from './utils/NavBar';
import { DashBoardRouter } from './Routers';
import { NewUser } from './views/NewUser';


function App() {
    const navigate = useNavigate();
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    const location = useLocation();
    useEffect(() => {
        if (!parsed) {
            navigate('/infor');
        } else if (location.pathname !== '/home') {
            navigate('/home');
        }
    }, [location.pathname, navigate, parsed]);

    return (
        <Box sx={{ position: 'relative' }}>
            <Routes>
            {parsed && (
                <Route
                    path="/*"
                    element={
                        <>
                            <NavBar />
                            <DashBoardRouter />
                        </>
                    }
                />
            )}
            <Route path="/infor" element={<NewUser />} />
        </Routes>
        </Box>
    );
}

export default App;