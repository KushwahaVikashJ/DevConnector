import React,{ Fragment,useState } from 'react'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Link,Redirect } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch,useSelector } from 'react-redux'

import { register, setAlert } from '../../redux/actions'
import { Signup } from "../../utils/APIServices"
import { AppForm, AppFormField, SubmitButton } from '../../components/form'
import AppSnackbar from '../../components/form/form-components/AppSnackbar'
import colors from '../../styles/colors';

const Register = (props) => {
    const userInfo = useSelector(store => store.user)
    const loading = userInfo.loading
    const isAuthenticated = userInfo.isAuthenticated
    const [isSecure, setSecure] = useState(true)
    const [showLoader,setShowLoader] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
  
    const initialValues = {
      name:'',  
      email:'',
      password:'',
      passwordConfirmation:''
    }
  
    const validationSchema = yup.object({
      name: yup
        .string()
        .required("Name is required")
        .matches(
            /^[A-Za-z.\s]+$/,
            "Please enter valid name"
        ),     
      email: yup
      .string()
      .email()
      .required("Email is required"),
      password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_~^%()+={}[|:"'<>,.?/\\/\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
      passwordConfirmation: yup
      .string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value
      }),


    })
  
    const onSubmitHandler = async (values, { resetForm }) => {
      setShowLoader(true)
      const payload = {
        name:values.name,
        email: values.email,
        password: values.password
      }
      dispatch(register(payload))
      resetForm()
      // const { response, error } = await Signup(payload)
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
      //   dispatch(setAlert('Registered Successfully','success'))
      //   dispatch(register(response.data))
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
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
              <AppForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}>
                <AppFormField
                  name="name"
                  placeholder="Name"
                  className={classes.input}
                />
                <AppFormField 
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={classes.input}
                  message="This site uses Gravatar so if you want a profile image, use a
                  Gravatar email" 
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
                {/* <div style={{height: 2}} /> */}
                <AppFormField 
                    name="passwordConfirmation"
                    type={isSecure ? "password" : "text"} 
                    // label="Re-enter Password"
                    placeholder="Re-enter Password"
                    className={classes.input} 
                    starticon={<LockIcon />}
                    endicon={
                    <IconButton onClick={()=> setSecure(!isSecure)}>
                        {isSecure ? <VisibilityOff style={{color: colors.SECONDARY}}/> : <Visibility style={{color: colors.SECONDARY}}/>}
                    </IconButton>
                    }
                />
                <SubmitButton loading={loading} title="Register" style={{width: '100%'}}/>
              </AppForm> 
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
input:{
    width: "100%",
},
}))

export default Register
