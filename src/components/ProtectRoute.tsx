import useWindowDimensions from '@/hooks/WindowDimensions';
import { BottomNav } from '@/utils/BottomNav';
import { NavBar } from '@/utils/NavBar';
import { Navigate, Outlet } from 'react-router-dom';


export function ProtectRoute() {
    const stored = localStorage.getItem('weather_app_infor');
    const parsed = stored ? JSON.parse(stored) : null;
    const {width}=useWindowDimensions()
    return (
        <>
            {parsed ? (
                <><Outlet/>{width>550 ? <NavBar/>: <BottomNav/>}</>
            ): <Navigate to='/infor' replace={true}/>}
        </>
    );
}
