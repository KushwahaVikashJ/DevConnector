import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    color:'red',
    marginTop:'7px'
  },
}));

export default function TextError(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.children}
    </div>
  );
}
