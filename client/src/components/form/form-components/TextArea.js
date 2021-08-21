import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

export default function (props){
  const {label, name, ...rest} = props
  return(
    <div className="form-control">
      <Field  
        as="textarea"
        name={name}
        {...rest} 
      />
      <ErrorMessage name={name} component={TextError}/>  
    </div>
  )
}