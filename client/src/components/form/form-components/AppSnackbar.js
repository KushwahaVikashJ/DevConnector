import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// severity = [error, warning, info, success]
export default function({message, severity="success", open, onClose}) {
  const classes = useStyles();
  const anchor = {vertical: 'top', horizontal: 'center'}
  return (
    <div className={classes.root}>
      <Snackbar anchorOrigin={anchor} open={open} autoHideDuration={3000} onClose={onClose}>
        <Alert onClose={onClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
