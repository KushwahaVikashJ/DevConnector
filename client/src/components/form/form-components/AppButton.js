import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'10px',
    minWidth:'100%',
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(0),
    position: 'relative',
  },
  button:{
    backgroundColor:'#45A8D6',
    color:'white',
    width:'26ch',
    // marginTop:'10px',
    '&:hover': {
      backgroundColor: '#3787AF',
    },
  },
  buttonProgress: {
    color: 'grey',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function({title, style, loading=false, ...restprops}) {
  const classes = useStyles();
  return (
    <div className={classes.root} style={style}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          className={classes.button}
          disabled={loading}
          {...restprops}>
          {title}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
