import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.png';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginLeft: theme.spacing(3),
    maxWidth: '50px',
    margin: '0',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(10),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative" elevation={10} style={{ backgroundColor: "#bbf8c0", color: 'black' }}>
        <Toolbar >
          <img className={classes.logo} src={logo} alt="Logo" />
          <Typography variant="h6" className={classes.title}>
            <strong>COVID-19 Tracker</strong>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
