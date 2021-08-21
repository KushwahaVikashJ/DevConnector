import React from 'react'
import { Field, useFormikContext } from 'formik'

import { makeStyles,withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';

import InputBase from '@material-ui/core/InputBase';
import { FormHelperText, OutlinedInput } from '@material-ui/core';

export default function (props){
  const {values, setFieldValue, errors, touched} = useFormikContext()
  const {label, placeholder, name, options, multiple, onChange, message, ...rest} = props

  return(
    <div style={{width:'100%', marginTop: 10}}>
      <Field name={name}>
        {({form,field})=>{
          const {setFieldValue} = form
          const {value} = field
          return( 
          <FormControl style={{width:'100%'}} variant="outlined">
          <>
            <InputLabel htmlFor="demo-simple-select-label">{label}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              multiple={multiple}
              name={name}
              label={label}
              value={value}
              placeholder={placeholder}
              input={<BootstrapInput/>}
              error={touched[name] && errors[name]}
              helperText={touched[name] && errors[name] ? errors[name] : message}
              onChange={
                (event)=>{
                  setFieldValue(name, event.target.value)
                  onChange && onChange(event.target.value)
                }
              }
            >
            {
              options?.map(op => 
                <MenuItem key={op.name} value={op.name}>{op.name}</MenuItem>            
              )
            }
            </Select>
          </>
          </FormControl> 
          ) 
        }}
      </Field>
      {/* <ErrorMessage name={name} component={TextError}/>  */}
      <FormHelperText error={touched[name] && errors[name]}>
        {touched[name] && errors[name] ? errors[name] : message}
      </FormHelperText> 
    </div>
  )
}

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
}))(OutlinedInput);