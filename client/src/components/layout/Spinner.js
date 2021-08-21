import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    height: '100px',
    width: '100px',
    top: '55%',
    left: '50%',
    marginLeft: '-55px',
    marginTop: '-50px',
    backgroundSize: '100%',
    [theme.breakpoints.down('xs')]: {
      top: '57%',
      left: '58%',
      marginLeft: '-58px',
      marginTop: '-57px',
    }
  },
}));

export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FacebookCircularProgress />
    </div>
  );
}
