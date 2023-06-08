
import { Home } from '@/views/Home';
import { Navigate, Route, Routes } from 'react-router-dom';

export function DashBoardRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}
