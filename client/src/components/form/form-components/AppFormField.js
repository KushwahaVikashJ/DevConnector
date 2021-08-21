import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel'
import { useFormikContext } from 'formik'
import { FormHelperText, OutlinedInput } from '@material-ui/core';
const BootstrapInput = withStyles((theme) => ({
  root: {
    // borderWidth: 1,
    // background: 'red',
    // 'label + &': {
    //   marginTop: theme.spacing(1),
    // },
    border:0,
    outline:'none'
  },
  input: {
    borderRadius: 4,
    borderWidth: 0,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    // width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderWidth: 0,
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      // borderColor: 'rgba(0,123,255)',
    },
  },
  focused: {
    borderWidth: 0,
    borderColor: 'rgba(0,123,255)',
  }
}))(OutlinedInput);

function AppFormField({onChange, name, label, message, ...restProps}){
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext()
  return(
    <div style={{width:'100%', marginTop: 10}}>
      <InputLabel htmlFor="demo-customized-textbox">{label}</InputLabel>
      <BootstrapInput 
        id="demo-customized-textbox" 
        name={name}
        onChange={e => {
          setFieldValue(name, e.target.value)
          onChange && onChange(e)
        }}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        error={touched[name] && errors[name]}
        helperText={touched[name] && errors[name] ? errors[name] : message}
        {...restProps}
      />
      {/* <ErrorMessage name={name} component={TextError}/>  */}
      <FormHelperText error={touched[name] && errors[name]}>
        {touched[name] && errors[name] ? errors[name] : message}
      </FormHelperText>
    </div>  
  )
}

export default AppFormField