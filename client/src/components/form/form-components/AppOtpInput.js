import React from 'react'
import { ErrorMessage } from 'formik'
import OtpInput from 'react-otp-input';
import TextField from '@material-ui/core/TextField'
import { useFormikContext } from 'formik'
import TextError from './TextError'
import colors from '../../../styles/colors'

function AppOtpInput({onChange ,name, message, ...restProps}){
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext()
  return(
    <div style={{width:'100%', marginTop:20}}>
      <OtpInput
        name={name}
        onChange={e => {
          setFieldValue(name, e.target.value)
        }}
        value={values}
        numInputs={6}
        separator={<span style={{marginRight:25}}></span>}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>  
  )
}

export default AppOtpInput