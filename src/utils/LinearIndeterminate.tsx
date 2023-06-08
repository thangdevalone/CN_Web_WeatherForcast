import { Box, LinearProgress } from "@mui/material";


export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%',position:"fix",top:"0",left:"0" ,zIndex:10000}}>
      <LinearProgress />
    </Box>
  );
}