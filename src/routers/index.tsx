import { NewUser } from '@/views/NewUser';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { DashBoardRouter } from './DashboardRouter';
import { NavBar } from '@/utils/NavBar';

export function Routers() {
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
    );
}
