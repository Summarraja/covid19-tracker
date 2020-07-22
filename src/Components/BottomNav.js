import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position:'fixed',
    bottom:0,
    backgroundColor:'#bbf8c0',
  },
  
});

export default function BottomNav({value}) {
  const classes = useStyles();

  return (
    <BottomNavigation
      value={value[0]}
      onChange={(event, newValue) => {
        value[1](newValue);
        // console.log(value[0]);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="All Countries" icon={<ListIcon />} />
    </BottomNavigation>
  );
}
