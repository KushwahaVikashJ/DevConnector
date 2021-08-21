import React,{ Fragment,useState } from 'react'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Link,Redirect } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch,useSelector } from 'react-redux'

import { login } from '../../redux/actions'
import { AppForm, AppFormField, SubmitButton } from '../../components/form'
import colors from '../../styles/colors';

const Login = (props) => {
    const userInfo = useSelector(store => store.user)
    const loading = userInfo.loading
    const isAuthenticated = userInfo.isAuthenticated
    const [isSecure, setSecure] = useState(true)
    const dispatch = useDispatch()
    const classes = useStyles()
  
    const initialValues = {
      email:'kushwahavicky743@gmail.com',
      password:'vikash123',
    }
  
    const validationSchema = yup.object({    
      email: yup
      .string()
      .email()
      .required("Email is required"),
      password: yup
      .string()
      .required("Password is required")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_~^%()+={}[|:"'<>,.?/\\/\$%\^&\*])(?=.{8,})/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // ),
    })
  
    const onSubmitHandler = async (values, { resetForm }) => {
      const payload = {
        email: values.email,
        password: values.password
      }
      dispatch(login(payload))
      resetForm()
      // const { response, error } = await Signin(payload)
      // setShowLoader(false)
      // if(error){
      //   const err = error.response ? error.response.data : ''
      //   if(err && err.data && err.data.length>0){
      //     dispatch(setAlert(err.data[0].msg + ': ' + err.data[0].param,'danger'))
      //     return
      //   }
      //   else if(err && err.message){
      //     dispatch(setAlert(err.message,'danger'))
      //     return
      //   }
      //   dispatch(setAlert('Something went wrong. ' + error.message,'danger'))
      //   return 
      // }
      // if (response.status) {
      //   dispatch(setAlert('Logged in Successfully','success'))
      //   dispatch(login(response.data))
      //   resetForm()         
      //   setTimeout(()=> { 
      //       props.history.push('/')
      //   }, 1000)    
      // } 
      // else {
      //   dispatch(setAlert(response.message,'danger'))
      // }
    }

    if (isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Login To Your Account</p>
              <AppForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}>
                
                <AppFormField 
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={classes.input}
                />
                <AppFormField 
                    name="password"
                    type={isSecure ? "password" : "text"} 
                    // label="Password"
                    placeholder="Password"
                    className={classes.input} 
                    starticon={<LockIcon/>}
                    endicon={
                    <IconButton onClick={()=> setSecure(!isSecure)}>
                        {isSecure ? <VisibilityOff style={{color: colors.SECONDARY}}/> : <Visibility style={{color: colors.SECONDARY}}/>}
                    </IconButton>
                    }
                    message="8 or more alphanumeric and special characters"
                />
                <SubmitButton loading={loading} title="LOGIN" style={{width: '100%'}}/>
              </AppForm>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
input:{
    width: "100%",
},
}))

export default Login
