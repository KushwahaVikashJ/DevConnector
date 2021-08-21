import React,{ Fragment } from 'react'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import { addPost } from '../../redux/actions'
import { AppForm, AppFormField, SubmitButton } from '../../components/form'

const PostForm = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const initialValues = {
        text: ''
    }
  
    const validationSchema = yup.object({ 
        text: yup
        .string()
        .required('Post is required')
    })
  
    const onSubmitHandler = async (values, { resetForm }) => {
      dispatch(addPost(values))
      resetForm()
    }
    
    return  (
        <Fragment>
            <div className='bg-primary p'>
                <h3>Say Something...</h3>
            </div>
              <AppForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}>
                <AppFormField
                  name="text"
                  type="input"
                  multiline="true"
                  rows="3"
                  placeholder="Create a post"
                  className={classes.input}
                />
                <SubmitButton title="Post" style={{width: '100%'}}/>
              </AppForm> 
        </Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
input:{
    width: "100%",
},
}))

export default PostForm
