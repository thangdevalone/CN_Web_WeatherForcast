import { NavBar } from '@/utils/NavBar';
import { Navigate, Outlet } from 'react-router-dom';


export function ProtectRoute() {
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    return (
        <>
            {parsed ? (
                <><NavBar/><Outlet/></>
            ): <Navigate to='/infor' replace={true}/>}
        </>
    );
}
