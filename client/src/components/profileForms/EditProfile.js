import React,{ Fragment,useState,useEffect } from 'react'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Link,Redirect } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import { createProfile, getCurrentProfile } from '../../redux/actions'
import { AppForm, AppFormField, AppFormPicker, SubmitButton } from '../../components/form'
import Spinner from '../../components/layout/Spinner'
import Status from '../../constants/status'

const Register = (props) => {
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const profileInfo = useSelector(store => store.profile)
    const loading = profileInfo.loading
    const profile = profileInfo.profile
    const classes = useStyles()
    const dispatch = useDispatch()
  
    useEffect(() => {
		dispatch(getCurrentProfile());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getCurrentProfile]);

    const initialValues = {
        company: profile?.company || '',
		website: profile?.website || '',
		location: profile?.location || '',
		status: profile?.status || '',
		skills: profile?.skills.join(',') || '',
		githubusername: profile?.githubusername || '',
		bio: profile?.bio || '',
		twitter: profile?.social?.twitter || '',
		facebook: profile?.social?.facebook || '',
		linkedin: profile?.social?.linkedin || '',
		youtube: profile?.social?.youtube || '',
		instagram: profile?.social?.instagram || ''
    }
  
    const validationSchema = yup.object({
        company: yup
        .string(),
        website: yup
        .string(),
        location: yup
        .string(),  
        status: yup
        .string()
        .required("Status is required"),
        skills: yup
        .string()
        .required("Skills is required"),
        githubusername: yup
        .string(),
        bio: yup
        .string(),      
        twitter: yup
        .string(),      
        facebook: yup
        .string(),      
        linkedin: yup
        .string(),      
        youtube: yup
        .string(), 
        instagram: yup
        .string(),      
    })
  
    const onSubmitHandler = async (values, { resetForm }) => {
      dispatch(createProfile(values,props,true))
      resetForm()
    }
    
  return loading && profileInfo.profile==null ? (
		<Spinner/>
	) : (
        <Fragment>
            <h1 className='large text-primary'>Update Your Profile</h1>
            <Link style={{float:'right'}} className='btn btn-light my-1 hide-sm' to='/dashboard'>
                Back
            </Link>
			<p className='lead'>
				<i className='fas fa-user' /> Let's get some information to make your
				profile stand out
			</p>
              <AppForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}>
                <AppFormPicker 
                  name='status'
                  placeholder='Status' 
                  options={Status}
                  className={classes.input}
                  message="Give us an idea of where you are at in your career"
                />
                <AppFormField
                  name="company"
                  placeholder="Company"
                  className={classes.input}
                  message="Could be your own company or one you work for"
                />
                <AppFormField
                  name="website"
                  placeholder="Website"
                  className={classes.input}
                  message="Could be your own or a company website"
                />
                <AppFormField
                  name="location"
                  placeholder="Location"
                  className={classes.input}
                  message="City & state suggested (eg. Boston, MA)"
                />
                <AppFormField
                  name="skills"
                  placeholder="Skills"
                  className={classes.input}
                  message="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <AppFormField
                  name="githubusername"
                  placeholder="Githubusername"
                  className={classes.input}
                  message="If you want your latest repos and a Github link, include your
                  username"
                />
                <AppFormField
                  name="bio"
                  placeholder="Bio"
                  className={classes.input}
                  message="Tell us a little about yourself"
                />
                <div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
                {displaySocialInputs && (
                    <Fragment>    
                        <AppFormField
                        name="twitter"
                        placeholder="Twitter"
                        className={classes.input}
                        />
                        <AppFormField
                        name="facebook"
                        placeholder="Facebook"
                        className={classes.input}
                        />
                        <AppFormField
                        name="linkedin"
                        placeholder="Linkedin"
                        className={classes.input}
                        />
                        <AppFormField
                        name="youtube"
                        placeholder="Youtube"
                        className={classes.input}
                        />
                        <AppFormField
                        name="instagram"
                        placeholder="Instagram"
                        className={classes.input}
                        />
                    </Fragment>
                )}
                <SubmitButton loading={loading} title="Update" style={{width: '100%'}}/>
              </AppForm> 
        </Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
input:{
    width: "100%",
},
action:{
    display: "flex",
    justifyContent: 'space-around'
}
}))

export default Register
