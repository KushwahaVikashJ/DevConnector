import React from 'react';
import Select from 'react-select';
import { Field, ErrorMessage, useFormikContext } from 'formik'
import TextError from './TextError'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default function AnimatedMulti(props) {
  const {label, name, options, multiple, ...rest} = props
  return (
    <div className="form-control" style={{marginTop:20}}>
    <Field name={name}>
      {({form,field})=>{
        const {setFieldValue} = form
        const {value} = field
        return(  
        <FormControl style={{width:'100%'}}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            closeMenuOnSelect={false}
            isMulti
            value={value} 
            options={options}
            onChange={(value)=>setFieldValue(name,value)}
          />
        </FormControl> 
        ) 
      }}
    </Field>
    <ErrorMessage name={name} component={TextError}/>  
  </div>
  );
}