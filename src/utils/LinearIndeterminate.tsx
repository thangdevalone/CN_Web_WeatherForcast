import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%',position:"fix",top:"0",left:"0" ,zIndex:10000}}>
      <LinearProgress />
    </Box>
  );
}