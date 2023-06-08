import { Box } from '@mui/material';
import './App.css';
import { MainRouter } from './Routers';




function App() {
    return (
        <Box sx={{ position: 'relative' }}>
            <MainRouter/>
        </Box>
    );
}

export default App;