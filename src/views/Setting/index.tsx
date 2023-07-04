import { Edit } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';

export function Setting() {
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
       
    }, []);
    const stored = localStorage.getItem('weather_app_infor');
    const [parsed, setParsed] = useState(stored ? JSON.parse(stored) : null);
    const [rename,setRename]=useState<string>('')
    const handleRename=()=>{
      const newParsed={...parsed,name:rename}
      setParsed(newParsed)
      localStorage.setItem('weather_app_infor',JSON.stringify(newParsed))
      enqueueSnackbar('Sửa thành công',{variant:"success"})
      setOpen(false);

    }
    return (
        <>
            {loading ? (
                <Stack className="full-box" alignItems="center" justifyContent="center">
                    <RingLoader color="#83acff" />
                </Stack>
            ) : (
                <Box
                    className="full-box"
                    sx={{
                        padding: '20px 30px',
                        background: 'var(--bg-light)',
                        overflow: 'hidden scroll',
                    }}
                >
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Đổi tên</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Hãy điền tên mà bạn muốn đổi xuống dưới
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Tên của bạn"
                                value={rename}
                                fullWidth
                                onChange={(e)=>setRename(e.target.value)}
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleRename}>Rename</Button>
                        </DialogActions>
                    </Dialog>
                    <Typography variant="h2">Cài đặt</Typography>
                    <Box sx={{ mt: '10px' }}>Tên của bạn: {parsed.name}</Box>
                    <Button sx={{ mt: '10px' }} onClick={handleClickOpen} variant="contained" startIcon={<Edit />}>
                        {' '}
                        Sửa tên
                    </Button>
                </Box>
            )}
        </>
    );
}
