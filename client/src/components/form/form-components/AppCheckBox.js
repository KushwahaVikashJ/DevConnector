import React from 'react'
import { Field,ErrorMessage } from 'formik'
import TextError from './TextError'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function(props){
  const {label, name, color="primary", onChange} = props
  return(
    <div>
      <Field  
        name={name}>
        {
          ({form,field}) => {
            const {setFieldValue} = form
            const {value} = field
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={e => {
                      setFieldValue(name, e.target.checked)
                      onChange && onChange(e.target.checked)
                    }}
                    name={name}
                    color={color}
                  />
                }
                label={label}
              />
            )
          }
        }
      </Field>    
      <ErrorMessage name={name} component={TextError} />  
    </div>
  )
}
