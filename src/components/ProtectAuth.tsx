import { Navigate, Outlet } from 'react-router-dom';

export function ProtectAuth() {
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    return !parsed ? <Outlet/> : <Navigate to='/home' replace={true}/>;
}
