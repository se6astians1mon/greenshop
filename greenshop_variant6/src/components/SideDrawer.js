//Component to display a styled drawer.
//props:none

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import React from 'react';
import { isMobile } from 'react-device-detect';

export default function SideDrawer(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginRight: props.drawerwidth
    },
    appbar: {
      width: '100%',
    },
    grid: {
      marginTop: "40px",
      padding: "10px"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    drawerDesktop: {
      width: props.drawerwidth,
      flexShrink: 0,
    },
    drawerMobile: {
      width: props.mobileDrawerWidth,
      flexShrink: 0,
    },
    drawerPaperMobileOpen: {
      width: "100%"
    },
    drawerPaper: {
      width: props.drawerwidth,
    },
    drawerPaperMobile: {
      width: props.mobileDrawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }));
  const classes = useStyles();
  return (
    <Drawer className={isMobile ? classes.drawerMobile : classes.drawerDesktop}
      variant="permanent"
      classes={!isMobile ? {
        paper: classes.drawerPaper,
      }:props.drawerOpen?{
        paper: classes.drawerPaperMobileOpen,
      }:{
        paper: classes.drawerMobile,
      }}
      anchor="right"
    >
      <div className={classes.toolbar} />
      <Divider />
      {isMobile ? <IconButton onClick={()=>{props.setDrawerOpen(!props.drawerOpen)}}>
        {props.drawerOpen?<ChevronRightIcon />:<ChevronLeftIcon />}
      </IconButton>:""}
      {props.children}
    </Drawer>);
}