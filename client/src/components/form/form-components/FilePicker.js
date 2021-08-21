import React, {useState} from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AppImageViewer from './AppImageViewer';
import { useFormikContext } from 'formik'
import { CircularProgress } from '@material-ui/core'
import { uploadRawFile } from '../../../utils/APIServices'
import { useSelector } from 'react-redux'
import colors from '../../../styles/colors'

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function FilePicker({onChange, name, title, getRawUrl=false, message="", ...restProps}){
  const { setFieldValue, errors, touched, values } = useFormikContext()
  const [showLoader, setShowLoader] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const token = useSelector(state => state.user.token)

  const images = [values[name]]

  const handleChange = (e) => {
    if(getRawUrl){
      setFieldValue(name,e.target.files[0])
      onChange && onChange(e)
      return
    }
    handleFileUpload(e.target.files[0])
    onChange && onChange(e)
  }

  const handleFileUpload = async(file)=>{
    setShowLoader(true)
    const payload = new FormData()
    payload.append('files', file)
    const { response, error } = await uploadRawFile(payload, token)
    setShowLoader(false)
    if(error){
      const err = error.response ? error.response.data : ''
      if(err && err.data &&  err.data.length > 0){
        return alert(err.data[0].msg) 
      }
      else if(err && err.message){
        return alert(err.message) 
      }
      return alert('Something went wrong. ' + error.message) 
    }
    if (response.status) {
      setFieldValue(name, response.data[0].location)
    } 
    else {
      alert(response.message)
    }
  }
  
  return(
    <div style={{width:'100%', marginTop: 20}}>
      <TextField
        name={name}
        disabled
        value={values[name]?.name?values[name]?.name:values[name]}
        placeholder={title}
        InputProps={{
          endAdornment: 
            <InputAdornment 
              position="end">
                {
                  showLoader ? 
                  <CircularProgress size={18} /> :
                  <>
                    <input
                      accept="image/*"
                      style={{display: 'none'}}
                      id="filepicker"
                      type="file"
                      onChange={handleChange}
                    />
                    <label htmlFor="filepicker">
                      <Button variant="text" color="primary" component="span" size="small">
                        ADD
                      </Button>
                    </label>
                  </>
                }
            </InputAdornment>
        }}
        error={touched[name] && errors[name]}
        helperText={
          (touched[name] && errors[name]) ? errors[name] : message
        }
        {...restProps}
      />
      {
        values[name] && 
        <a href={values[name]} target="_blank" rel="noreferrer" style={{color: colors.PRIMARY, textDecoration: 'none'}}>View</a>
        //<AppImageViewer images={values[name]}/>
        // <div onClick={() => setOpen(true)}>
        //   View
        // </div>
      }
      {/* {isOpen && (
        <Lightbox
          reactModalStyle={{zIndex: 10000000000}}
          mainSrc={images[0]}
          onCloseRequest={() => setOpen(true)}
        />
      )} */}
    </div>  
  )
}

export default FilePicker
