import React,{ Fragment,useState,useEffect } from 'react'
import * as yup from 'yup'
import Typography from '@material-ui/core/Typography'
import colors from '../../styles/colors'
import { makeStyles } from '@material-ui/core/styles'
import { Link,Redirect } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'

import { addExperience } from '../../redux/actions'
import { AppForm, AppFormField, AppDatePicker, AppCheckBox , SubmitButton } from '../../components/form'


const AddEducation = (props) => {
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const profileInfo = useSelector(store => store.profile)
    const loading = profileInfo.loading
    const profile = profileInfo.profile
    const [isDatePickerVisible1, setDatePickerVisible1] = useState(false)
    const [isDatePickerVisible2, setDatePickerVisible2] = useState(false)
    const [isSelected, setSelected] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const initialValues = {
        company: '',
        title: '',
        location: '',
        from: null,
        to: null,
        current: '',
        description: ''
    }
  
    const validationSchema = yup.object({
        company: yup
        .string()
        .required("Company is required"),
        title: yup
        .string()
        .required("Title is required"),
        location: yup
        .string(),  
        from: yup
        .string()
        .nullable(),
        to: yup
        .string()
        .nullable(),
        current: yup
        .string(),
        description: yup
        .string(),      
    })
  
    const onSubmitHandler = async (values, { resetForm }) => {
        let payload = {
            ...values,
            from: values.from ? moment(values.from).format('MM-DD-YYYY'):'',
            to: values.to ? moment(values.to).format('MM-DD-YYYY'):''
        }
        dispatch(addExperience(payload,props))
        resetForm()
    }
    
    return (
        <Fragment>
            <h1 className='large text-primary'>Add Experience</h1>
            <Link style={{float:'right'}} className='btn btn-light my-1 hide-sm' to='/dashboard'>
                Back
            </Link>
			<p className='lead'>
				<i className='fas fa-user'/> Add any developer/programming positions
                that you have had in the past
			</p>
              <AppForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}>
                <AppFormField
                  name="company"
                  placeholder="Company"
                  className={classes.input}
                />
                <AppFormField
                  name="title"
                  placeholder="Title"
                  className={classes.input}
                />
                <AppFormField
                  name="location"
                  placeholder="Location"
                  className={classes.input}
                />
                <AppDatePicker 
                    name='from'
                    label='Start Date'
                    maximumDate={new Date()}
                    isDatePickerVisible={isDatePickerVisible1}
                    handleDatePickerVisibility={()=>
                        setDatePickerVisible1(val => !val)
                    }
                    className={classes.input}
                />
                <AppCheckBox 
                    name="current"
                    label="Current"
                    onChange={setSelected}
                />
                {
                isSelected ? null:
                    <AppDatePicker 
                    name='to'
                    label='End Date'
                    maximumDate={new Date()}
                    isDatePickerVisible={isDatePickerVisible2}
                    handleDatePickerVisibility={()=>
                        setDatePickerVisible2(val => !val)
                    }
                    className={classes.input}
                    />  
                }
                <AppFormField
                  name="description"
                  placeholder="Description"
                  className={classes.input}
                />
                <SubmitButton title="Add" style={{width: '100%'}}/>
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

export default AddEducation
