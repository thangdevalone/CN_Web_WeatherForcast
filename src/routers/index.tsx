import { NewUser } from '@/components/NewUser';
import { Home } from '@/views/Home';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

export function Routers() {
  const stored = localStorage.getItem('weather_app_infor');
  const parsed = stored ? JSON.parse(stored) : null;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!parsed && location.pathname !== '/infor') {
      navigate('/infor', { replace: true });
    } else if (parsed && location.pathname !== '/home') {
      navigate('/home', { replace: true });
    }
  }, [parsed, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/infor" element={<NewUser />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
