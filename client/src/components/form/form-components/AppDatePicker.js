import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText, OutlinedInput } from '@material-ui/core';
import { Field,ErrorMessage, useFormikContext } from 'formik'
import TextError from './TextError'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import InputBase from '@material-ui/core/InputBase';
// import { OutlinedInput } from '@material-ui/core';

function DatePicker(props){
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext()
  const {label, name, message, ...rest} = props
  return(
    <div style={{width:'100%',marginTop:20}}>
      <Field name={name}>
        {({form,field})=>{
          const {setFieldValue} = form
          const {value} = field
          return( 
          <MuiPickersUtilsProvider utils={DateFnsUtils}>  
            <KeyboardDatePicker
              // disableToolbar
              input={<BootstrapInput />}
              variant="inline"
              id="date-picker-inline"
              label={label}
              value={value}
              name={name}
              format="dd/MM/yyyy"
              onChange={(date)=>setFieldValue(name,date)}
              onBlur={() => setFieldTouched(name)}
              error={touched[name] && errors[name]}
              helperText={touched[name] && errors[name] ? errors[name] : message}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              {...rest}
            />
          </MuiPickersUtilsProvider>  
          ) 
        }}
      </Field>  
      {/* <ErrorMessage name={name} component={TextError}/>   */}
      <FormHelperText error={touched[name] && errors[name]}>
        {touched[name] && errors[name] ? errors[name] : message}
      </FormHelperText>
    </div>
  )
}

export default DatePicker

const BootstrapInput = withStyles((theme) => ({
  root: {
    borderWidth: 1,
    // background: 'red',
    minWidth: '100%',
    'label + &': {
      marginTop: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 4,
    borderWidth: 0.1,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    // width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderWidth: 0.1,
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: 'rgba(0,123,255)',
    },
  
  },
  focused: {
    borderWidth: 0.1,
    // background:'red',
    borderColor: 'rgba(0,123,255)',
  }
}))(InputBase);