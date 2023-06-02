import { Home } from '@/views/Home';
import * as React from 'react';

import { Routes, Route } from 'react-router-dom';
export function Routers() {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
        </Routes>
    );
}
