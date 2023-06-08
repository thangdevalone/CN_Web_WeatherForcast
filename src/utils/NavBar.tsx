
import { List, ListItemButton, styled } from '@mui/material';
import classes from './style.module.css';
import { useLocation } from 'react-router-dom';
import { CalendarIcon, ChartIcon, DashBoardIcon, LocationIcon, SettingIcon } from '../assets/Icons';

const ListItemButtonCustom = styled(ListItemButton)(() => ({
  '&.Mui-selected': {
    backgroundColor: 'var(--bg-item-selected)',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'var(--bg-item-selected)',
  },
}));

const ListItemButtonCustomFirst = styled(ListItemButton)(() => ({
  '&.Mui-selected': {
    backgroundColor: 'var(--bg-item-selected)',
  },
  '&': {
    position: 'relative',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'var(--bg-item-selected)',
  },
  '&::before': {
    display: 'block',
    content: '""',
    position: 'absolute',
    width: '30px',
    height: '30px',
    top: '-30px',
    left: '0px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    boxShadow: `${location.pathname === "/home" ? "-15px 18px var(--bg-item-selected)" : "-15px 18px var(--bg-ele-blue)"}`,
  },
}));

const ListItemButtonCustomLast = styled(ListItemButton)(() => ({
  '&.Mui-selected': {
    backgroundColor: 'var(--bg-item-selected)',
  },
  '&': {
    position: 'relative',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'var(--bg-item-selected)',
  },
  '&::before': {
    display: 'block',
    content: '""',
    position: 'absolute',
    width: '30px',
    height: '30px',
    bottom: '-30px',
    left: '0px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    boxShadow: `${location.pathname === "/setting" ? "-18px -15px var(--bg-item-selected)" : "-18px -15px var(--bg-ele-blue)"}`,
  },
}));

export function NavBar() {
  const location = useLocation();
  return (
    <List
      className={classes.navBar}
      sx={{
        position: 'absolute',
        top: '50%',
        padding: 0,
        transform: 'translate(-50px,-50%)',
        transition:'all 0.3s',
        "&:hover":{
          transform:"translate(0px,-50%)"
        },
        left: '0px',
        background: 'var(--bg-ele-blue)',
        boxShadow: 'rgba(0, 114, 228, 0.1) 0px -8px 24px, rgba(0, 114, 228, 0.1) 8px 0px 24px, rgba(0, 114, 228, 0.1) 0px 8px 24px',
      }}
    >
      <ListItemButtonCustomFirst className={classes.boxIconNav} selected={location.pathname === '/home'}>
        <DashBoardIcon color="white" />
      </ListItemButtonCustomFirst>
      <ListItemButtonCustom className={classes.boxIconNav} selected={location.pathname === '/location'}>
        <LocationIcon color="white" />
      </ListItemButtonCustom>
      <ListItemButtonCustom className={classes.boxIconNav} selected={location.pathname === '/calendar'}>
        <CalendarIcon color="white" />
      </ListItemButtonCustom>
      <ListItemButtonCustom className={classes.boxIconNav} selected={location.pathname === '/calendar'}>
        <ChartIcon color="white" />
      </ListItemButtonCustom>
      <ListItemButtonCustomLast className={classes.boxIconNav} selected={location.pathname === '/settings'}>
        <SettingIcon color="white" />
      </ListItemButtonCustomLast>
    </List>
  );
}
