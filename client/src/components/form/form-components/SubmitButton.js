import React from 'react'
import { useFormikContext } from 'formik'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppButton from './AppButton'
import { Button } from '@material-ui/core'

function SubmitButton({title, ...restProps}) {
  const { handleSubmit } = useFormikContext()
  return (
    <AppButton 
      title={title} 
      onClick={handleSubmit} 
      {...restProps}
    />
  )
}

export const SubmitButtonHidden = React.forwardRef((props, ref) => {
  const { handleSubmit } = useFormikContext()
  return (
    <button onClick={handleSubmit} ref={ref} style={{display:'none'}}>
      Hidden
    </button>
  )
})

export const SubmitDialogButton = ({title, loading, ...restProps}) => {
  const { handleSubmit } = useFormikContext()
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant={loading ? 'contained' : 'text'}
          className={classes.button}
          disabled={loading}
          onClick={handleSubmit}
          {...restProps}>
          {title}
        </Button>
        {loading && <CircularProgress size={20} className={classes.buttonProgress} />}
      </div>
    </div>
    // <Button onClick={handleSubmit} {...restProps}>
    //   {title}
    // </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop:'10px',
    // minWidth:'100%',
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(0),
    position: 'relative',
  },
  button:{
    // backgroundColor:'#45A8D6',
    // color:'white',
    // width:'26ch',
    // marginTop:'10px',
    '&:hover': {
      // backgroundColor: '#3787AF',
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

export default SubmitButton
